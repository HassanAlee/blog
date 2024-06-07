import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUSer } from '../redux-toolkit/features/userSlice'
import { useDispatch } from 'react-redux'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { getAllBlogs } from '../redux-toolkit/features/blogsSlice';
const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [showPass, setShowPass] = useState(false)
    const [userData, setUserData] = useState(() => {
        return { email: "", password: "" }
    })
    // getting states from gsm
    // change handler to update credentials
    const handleChange = ({ target: { value, name } }) => {
        setUserData((prev) => {
            return { ...prev, [name]: value }
        })
    }
    // on submit handler
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(loginUSer(userData)).then((res) => {
            if (res.payload.hasOwnProperty("country")) {
                dispatch(getAllBlogs())
                setUserData({ password: "", email: "" })
                setTimeout(() => {
                    navigate('/')
                }, 2500)
            }
        })
    }
    return (
        <section className='sm:h-[99vh] h-full w-full  flex justify-between flex-col sm:flex-row sm:items-center'>
            {/* form side */}
            <article className='flex-1 h-full'>
                <div className='h-full w-full flex sm:items-center mt-20 sm:mt-0 justify-center'>
                    <form className='text-sm w-full sm:w-[60%] px-4 sm:px-0' onSubmit={submitHandler}>
                        <h1 className='capitalize font-medium text-3xl'>Welcome back!</h1>
                        <h5 className='mb-8 mt-2'>Enter your credentials to access your account</h5>
                        <div className='flex flex-col mb-4'>
                            <label htmlFor="name" className='mb-1'>Email</label>
                            <input type="email" id='email' name='email' className='rounded-lg py-2 px-3 outline-none border' value={userData.email} onChange={handleChange} />
                        </div>
                        <div className='flex flex-col mb-4'>
                            <label htmlFor="password" className='mb-1'>Password</label>
                            <div className='flex items-center border rounded-md pr-4'>
                                <input type={showPass ? "text" : "password"} id='password' name='password' className='rounded-lg py-2 px-3 outline-none w-full' value={userData.password} onChange={handleChange} />
                                <span onClick={() => setShowPass(prev => !prev)} className='cursor-pointer'>
                                    {showPass ? <FaRegEye /> : <FaRegEyeSlash />}
                                </span>
                            </div>
                        </div>
                        <button className='w-full rounded-2xl mt-3 bg-[#4b6bfb] capitalize text-white py-2 font-medium text-lg hover:opacity-70'>Login</button>
                        <p className='mt-3 text-sm text-center'>Don't have an account? <Link className='text-[#4b6bfb]' to={"/register"}>Sign up</Link></p>
                    </form>
                </div>
            </article >
            {/* image side */}
            <article className='flex-1 h-full hidden sm:block'>
                <img src="images/form.png" alt="flowers_img" className='h-full w-full' />
            </article>
        </section>
    )
}

export default Register