import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ProfileTop } from '../components/ProfileTop'
import AllBlogs from '../components/AllBlogs'
import { getAllBlogs } from '../redux-toolkit/features/blogsSlice';
import { useParams } from 'react-router-dom';
const SingleAuthor = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const { authors } = useSelector((state) => state.userSlice)
    const { blogs } = useSelector((state) => state.blogsSlice)
    useEffect(() => {
        if (blogs.length == 0) {
            dispatch(getAllBlogs())
        }
    }, [])
    let thisAuthor = authors.find((author) => author._id == id);
    let { _id } = thisAuthor;
    return (
        <>
            <ProfileTop currentUser={authors.find((author) => author._id == id)} />
            <AllBlogs blogs={blogs.filter((blog) => blog.authorRef == _id)} />
        </>
    )
}

export default SingleAuthor