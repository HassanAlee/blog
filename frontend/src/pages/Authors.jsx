import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllAuthors } from '../redux-toolkit/features/userSlice'
import { Link } from 'react-router-dom'
const Authors = () => {
  const dispatch = useDispatch()
  const { authors, currentUser } = useSelector((state) => state.userSlice)
  useEffect(() => {
    if (!authors || authors.length == 0) {
      dispatch(getAllAuthors())
    }
  }, [])
  return (
    <div className='flex md:gap-x-4 lg:gap-8 flex-wrap w-full px-8 md:px-0'>{authors && authors.map((author) => {
      return (
        <Link to={`/authors/${author._id}`} className='flex gap-x-8 mt-8 sm:mt-0 sm:gap-y-4 items-center shadow-md hover:shadow-2xl  hover:bg-[#c7ecee] px-4 py-2 rounded-lg md:w-[48%] lg:w-1/4 w-full'>
          <img src={author.profile || "images/user.png"} alt={author.name} className='h-[70px] w-[70px] rounded-full' />
          <div>
            <h1 className='font-medium'>{author.name}{author._id == currentUser._id ? " (You)" : ""}</h1>
            <p className='text-sm'>{author.country}</p>
          </div>
        </Link>
      )
    })}</div>
  )
}

export default Authors