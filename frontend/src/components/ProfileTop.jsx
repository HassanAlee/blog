import { useState } from 'react'
import { FaFacebookSquare, FaInstagramSquare, FaLinkedin, FaTwitterSquare, FaYoutubeSquare } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import { logout } from '../redux-toolkit/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../redux-toolkit/features/userSlice';
import { deleteUserBlogs } from '../redux-toolkit/features/blogsSlice';
import Modal from './Modal';
export const ProfileTop = ({ currentUser }) => {
    const { currentUser: logedUser } = useSelector((state) => state.userSlice)
    const dispatch = useDispatch()
    const [modalState, setModalState] = useState({ text: "", open: false, handler: null, btnText: '' })
    const socialList = [
        {
            icon: <FaFacebookSquare />,
            url: currentUser.facebook || ""
        },
        {
            icon: <FaInstagramSquare />,
            url: currentUser.instagram || ""
        },
        {
            icon: <FaTwitterSquare />,
            url: currentUser.twitter || ""
        },
        {
            icon: <FaLinkedin />,
            url: currentUser.linkedin || ""
        },
        {
            icon: <FaYoutubeSquare />,
            url: currentUser.youtube || ""
        }
    ]
    const navigate = useNavigate();
    const path = window.location.pathname;
    // delete user account handler
    const deleteAccount = (id) => {
        dispatch(deleteUser(id)).then((res) => {
            dispatch(deleteUserBlogs(res.payload._id))
        })
    }
    // function to handle modal dynamically
    const handleModal = (text, handler, btnText) => {
        setModalState({ ...modalState, open: true, text, handler, btnText })
    }
    return (
        <div className='bg-[#f6f6f7] px-10 sm:px-40 py-10 rounded-lg'>
            {/* img and name */}
            <article className='flex justify-center items-center gap-x-4 '>
                <img src={currentUser.profile ? currentUser.profile : "user.png" ? "user.png" : "/public/images/user.png"} className='h-12 w-12 rounded-full' alt={currentUser.name} />
                <div>
                    <h1 className='text-[#181A2A]'>{currentUser.name}</h1>
                    <h4 className='text-sm text-[#696A75]'>{currentUser.country}</h4>
                    {
                        currentUser._id == logedUser._id && <div className='flex justify-between gap-3 mt-2'>
                            <button className='bg-[#4B6BFB] px-2 capitalize text-white rounded-md hover:opacity-50' onClick={() => handleModal('Are you sure to logout?', () => {
                                setModalState({ ...modalState, open: false, text: '', handler: '', btnText: '' })
                                dispatch(logout())
                            }, "logout")}>logout</button>
                            <button className='bg-[#c0392b] px-2 capitalize text-white rounded-md hover:opacity-50' onClick={() => handleModal("Are you sure to delete your account?", () => {
                                setModalState({ ...modalState, open: false, text: '', handler: '', btnText: '' })
                                dispatch(deleteAccount(currentUser._id))
                            }, 'delete')}>delete account</button>
                        </div>
                    }
                </div>
                {modalState.open && <Modal><div className='bg-white p-10 rounded-md'>
                    <h1 className='text-3xl font-medium'>{modalState.text}</h1>
                    <div className='mt-4 flex gap-2 justify-center'>
                        <button className='bg-[#c0392b] p-2 capitalize text-white rounded-md hover:opacity-50' onClick={(modalState.handler)}>{modalState.btnText}</button>
                        <button className='bg-[#4B6BFB] px-2 capitalize text-white rounded-md hover:opacity-50' onClick={() => setModalState({ ...modalState, open: false })}>cancel</button>
                    </div>
                </div></Modal>}
            </article>
            <p className='text-[#3B3C4A] text-lg text-center my-8'>
                {currentUser.info || !currentUser.info == "" ? currentUser.info : `Meet ${currentUser.name}, a passionate writer and blogger with a love for technology and travel. ${currentUser.name} holds a degree in Computer Science and has spent years working in the tech industry, gaining a deep understanding of the impact technology has on our lives.`}
            </p>
            {/* socials */}
            <div className='flex justify-center gap-x-2 text-3xl text-[#696A75]'>
                {
                    socialList.map((link, i) => (link.url || link.url != "") && <Link key={i} to={link.url} target='_blank'>{link.icon}</Link>)
                }
            </div>
            {/* buttons */}
            {
                window.location.pathname == "/profile" && <>
                    <div className='flex flex-row mt-10 justify-center gap-4 flex-wrap'>
                        <Button text={"update profile"} click={() => navigate('/update-profile')} />
                        {/* <Button text={"view blogs"} click={loadBlogs} /> */}
                        <Button text={"write blog"} click={() => navigate('/write-blog')} />
                    </div>
                </>
            }
        </div>
    )
}
