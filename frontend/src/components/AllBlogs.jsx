import React from 'react'
import SingleBlog from './SingleBlog'
const AllBlogs = ({ blogs, icons = false }) => {
    return (
        <section className='mt-8 mb-60'>
            <h1 className='text-2xl font-bold capitalize'>latest blogs</h1>
            <div className="container flex flex-wrap md:flex-row px-3 md:px-0 flex-col gap-x-3 ">
                {
                    blogs.map((blog, i) => <SingleBlog {...blog} key={i} icons={icons} />)
                }
            </div>
        </section>
    )
}

export default AllBlogs