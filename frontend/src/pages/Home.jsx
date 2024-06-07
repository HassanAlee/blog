import React, { useEffect } from 'react'
import AllBlogs from '../components/AllBlogs';
import Button from '../components/Button';
import { getAllBlogs } from '../redux-toolkit/features/blogsSlice';
import { useSelector, useDispatch } from 'react-redux'
import { getDateFormat } from '../utils/getDateFormat';
import { getAllAuthors, validateUser } from '../redux-toolkit/features/userSlice';
const Home = () => {
  const dispatch = useDispatch()
  const { blogs } = useSelector((state) => state.blogsSlice)
  useEffect(() => {
    if (blogs.length == 0) {
      dispatch(getAllBlogs())
    }
    dispatch(validateUser()).then(() => {
      dispatch(getAllBlogs())
      dispatch(getAllAuthors())
    })
  }, [])
  let random = Math.floor(Math.random() * blogs.length)
  let formattedDate = getDateFormat(blogs[random]?.createdAt)
  useEffect(() => {
    random = Math.floor(Math.random() * blogs.length)
    formattedDate = getDateFormat(blogs[random]?.createdAt)
  }, [blogs])
  return (
    <>
      {/* top section */}
      <section className='h-[670px] w-full relative mb-28 sm:mb-0'>
        <img src={blogs[random]?.image || "images/Image.png"} alt="main" className='h-[80vh] w-full object-cover rounded-2xl' />
        {/* blog info */}
        <div className='absolute sm:bottom-[25%] md:bottom-[15%] bottom-[-15%] left-[4%] rounded-md bg-white w-[96%] md:w-[600px] flex flex-col gap-y-4 p-8 shadow-md'>
          <Button text={blogs[random]?.category} />
          <h1 className='text-4xl font-medium'>{blogs && blogs[random]?.title}</h1>
          <div className='flex items-center justify-between w-full sm:w-1/2'>
            <img src={blogs[random]?.authorImage || "images/user.png"} alt="user1" className='h-[50px] w-[50px] rounded-full' />
            <p className='capitalize text-[#97989F] font-medium'>{blogs && blogs[random]?.authorName}</p>
            <p className='text-sm text-[#97989F] font-medium'>{formattedDate?.toLocaleString('en-US', { month: 'long' })}{" "}{formattedDate.getDate()},{" "}{formattedDate?.getFullYear()}</p>
          </div>
        </div>
      </section>
      {/* all blogs section */}
      <AllBlogs blogs={blogs} />
    </>
  )
}

export default Home