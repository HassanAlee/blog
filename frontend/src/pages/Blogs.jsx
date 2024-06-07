import React, { useEffect } from 'react'
import { FaUserAlt } from "react-icons/fa";
import AllBlogs from '../components/AllBlogs';
import { useSelector, useDispatch } from 'react-redux'
import { getAllBlogs } from '../redux-toolkit/features/blogsSlice';
import { getDateFormat } from '../utils/getDateFormat';
const Blogs = () => {
  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state.blogsSlice)
  let random = Math.floor(Math.random() * blogs.length)
  let formattedDate = getDateFormat(blogs[random]?.createdAt)
  useEffect(() => {
    if (blogs.length == 0) {
      dispatch(getAllBlogs())
    }
    random = Math.floor(Math.random() * blogs.length)
    formattedDate = getDateFormat(blogs[random]?.createdAt)
  }, [blogs])
  return (
    <section className='h-full'>
      <h1 className='capitalize text-center mb-4 text-2xl font-semibold'>all blogs</h1>
      {/* top head section */}
      <div className='h-[60vh] relative'>
        <img src={blogs[random].image} alt="image" className='h-full w-full object-cover bg-center rounded-xl' />
        <div className='absolute top-1/2 sm:top-[60%] left-2 sm:left-8 h-full w-full'>
          <h1 className='bg-[#4b6bfb] text-white p-1 rounded-md inline-block capitalize '>{blogs[random].category}</h1>
          <h1 className='my-1 text-white first-letter:capitalize text-2xl font-bold'>{blogs[random]?.title}</h1>
          <div className='flex items-center gap-x-2 text-white text-sm'>
            <img src={blogs[random]?.authorImage || "/images/user.png"} alt={blogs[random]?.authorName} className='h-[60px] w-[60px] rounded-full' />
            <p>{blogs[random]?.authorName}</p>
            <p className='text-sm text-white font-medium'>{formattedDate?.toLocaleString('en-US', { month: 'long' })}{" "}{formattedDate.getDate()},{" "}{formattedDate?.getFullYear()}</p>
          </div>
        </div>
      </div>
      {/* all blogs */}
      <div>
        {
          blogs && <AllBlogs blogs={blogs} />
        }
      </div>
    </section>
  )
}

export default Blogs