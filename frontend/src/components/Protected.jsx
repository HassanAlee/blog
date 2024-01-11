import React from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Login from '../pages/Login'
const Protected = () => {
    const { currentUser } = useSelector((state) => state.userSlice)
    return (
        <>
            {
                currentUser && currentUser ? <Outlet /> : <Login />
            }
        </>
    )
}

export default Protected