import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllBlogs } from '../redux-toolkit/features/blogsSlice'
import { useNavigate, useParams } from 'react-router-dom'

import { getDateFormat } from '../utils/getDateFormat'
const OpenBlog = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { blogs } = useSelector((state) => state.blogsSlice)
    useEffect(() => {
        if (blogs.length == 0) {
            dispatch(getAllBlogs())
        }
    }, [])
    let thisBlog = blogs.find((item => item._id == id))
    let formattedDate = getDateFormat(thisBlog.createdAt);
    useEffect(() => {
        thisBlog = blogs.find((item => item._id == id))
        formattedDate = getDateFormat(thisBlog.createdAt)
    }, [blogs])
    return (
        <section className='h-full px-4 '>
            <h4 className='bg-[#4b6bfb] inline-block px-2 py-1 rounded-md text-white text-xs'>{thisBlog.category}</h4>
            <h2 className='font-semibold text-4xl my-5'>{thisBlog.title}</h2>
            <div className='flex items-center gap-x-5 w-full'>
                <img src={thisBlog.authorImage || "images/user.png"} alt="user1" className='h-[50px] w-[50px] rounded-full object-cover' />
                <p className='capitalize text-[#97989F] font-medium hover:cursor-pointer hover:text-[#4b6bfb] hover:underline' onClick={() => navigate(`/authors/${thisBlog.authorRef}`)}>{blogs && thisBlog.authorName}</p>
                <p className='text-sm text-[#97989F] font-medium'>{formattedDate.toLocaleString('en-US', { month: 'long' })}{" "}{formattedDate.getDate()},{" "}{formattedDate.getFullYear()}</p>
            </div>
            <div className='w-full h-50vh sm:h-[70vh] my-10'>
                <img src={thisBlog.image} alt="title_image" className='h-full w-full rounded-xl' />
            </div>
            < p className='text-justify text-xl mb-10 list-inside list-decimal' dangerouslySetInnerHTML={{ __html: thisBlog.description }} />
        </section>
    )
}

export default OpenBlog