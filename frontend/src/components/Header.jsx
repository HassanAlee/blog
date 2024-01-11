import React from 'react'
import { Link } from 'react-router-dom'
// import { CiLight, CiDark } from 'react-icons/ci'
import { useSelector } from 'react-redux'
let navItems = [
  {
    text: "Home",
    path: "/"
  },
  {
    text: "Blogs",
    path: "/blogs"
  },
  {
    text: "Authors",
    path: "/authors"
  },
  // {
  //   text: "Profile",
  //   path: "/profile"
  // }
]
const Header = () => {
  const { currentUser } = useSelector((state) => state.userSlice)
  return (
    (
      <>
        <header className='flex justify-between items-center  flex-col md:flex-row w-full mx-auto py-6 px-3 md:px-0 mb-6'>
          {/* logo */}
          <Link to={'/'} className='w-full text-center md:text-left sm:w-1/4'>
            <h1 className='text-2xl '>the<span className='text-[#4b6bfb] font-bold text-2xl'>Social</span><span className=' font-bold text-2xl text-[#5758BB]'>Blog</span></h1>
          </Link>
          {/* menu */}
          <ul className='w-full md:w-2/4 flex flex-row'>
            {
              navItems.map((item, index) => <Link key={index} to={item.path} className='md:mx-5 mx-2 w-1/4 text-xl'>{item.text}</Link>)
            }
            <Link className='md:mx-5 mx-2 w-1/4 text-xl' to={currentUser ? "/profile" : "/login"}>
              {currentUser ? ((currentUser.profile == '' || !currentUser.profile) ? <img src="./user.png" alt={currentUser.name} className='h-10 w-10 rounded-full' /> : <img src={currentUser.profile} alt={currentUser.name} className='h-10 w-10 rounded-full' />) : "Login"}
            </Link>
          </ul>

          {/* toggle*/}
          {/* <CiLight className='text-3xl' /> */}
        </header>
      </>
    )
  )
}

export default Header