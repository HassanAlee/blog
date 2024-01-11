import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { updateUser } from '../redux-toolkit/features/userSlice'
import { app } from '../firebase';
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from 'firebase/storage';
const socialList = [
    {
        icon: "images/facebook.png",
        text: "facebook"
    },
    {
        icon: "images/instagram.png",
        text: "instagram"
    },
    {
        icon: "images/twitter.png",
        text: "twitter"
    },
    {
        icon: "images/linkedin.png",
        text: "linkedin"
    },
    {
        icon: "images/youtube.png",
        text: "youtube"
    }
]
const UpdateProfile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const imageRef = useRef()
    const { currentUser } = useSelector((state) => state.userSlice)
    const [userData, setUserData] = useState(
        { name: currentUser.name, email: currentUser.email, country: currentUser.country, info: currentUser.info ? currentUser.info : "", facebook: currentUser.facebook ? currentUser.facebook : "", instagram: currentUser.instagram ? currentUser.instagram : "", linkedin: currentUser.linkedin ? currentUser.linkedin : "", twitter: currentUser.twitter ? currentUser.twitter : "", youtube: currentUser.youtube ? currentUser.youtube : "", profile: currentUser.profile ? currentUser.profile : "" }
    )
    // firebase related
    const [file, setFile] = useState(undefined);
    const [filePerc, setFilePerc] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(false);
    // image upload function
    const handleFileUpload = (file) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setFilePerc(Math.round(progress));
            },
            (error) => {
                setFileUploadError(true);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setUserData({ ...userData, profile: downloadURL })
                    setFile('')
                }
                );
            }
        );
    };
    // useEffect to upload image
    useEffect(() => {
        if (file) {
            handleFileUpload(file)
        }
    }, [file])
    // change handler to update state
    const handleChange = ({ target: { name, value } }) => {
        setUserData((prev) => {
            return { ...prev, [name]: value }
        })
    }
    // submit handler
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updateUser({ id: currentUser._id, ...userData })).then(() => {
            setTimeout(() => {
                navigate('/profile')
            }, 2500)
        })
    }
    return (
        <section className='w-full flex justify-between flex-col sm:flex-row'>
            {/* form side */}
            <article className='flex-1 h-full overflow-y-auto py-4'>
                <div className='h-full w-full flex items-center justify-center'>
                    <form className='text-sm w-full sm:w-[60%] px-4 sm:px-0' onSubmit={handleSubmit}>
                        <h1 className='capitalize font-medium text-3xl '>update profile</h1>
                        <p className='mb-4 mt-2'>Only fields mark with * are mandatory</p>
                        <div>
                            {
                                file ? <p className='text-sm text-green-500 text-center my-3'>Please wait till the image is upoaded</p> : <>
                                    <img src={userData.profile == "" ? "/images/user.png" : userData.profile} alt="user" className='mx-auto hover:cursor-pointer rounded-full h-20 w-20 object-cover mb-6' onClick={() => imageRef.current.click()} />
                                    <input type="file" className='hidden' ref={imageRef} onChange={(e) => setFile(e.target.files[0])} />
                                </>
                            }
                            {
                                fileUploadError && <p className='my-4 text-center'>Something went wrong while uploading the image</p>
                            }
                        </div>
                        <div className='flex flex-col mb-4'>
                            <label htmlFor="name" className='mb-1'>Name*</label>
                            <input type="text" id='name' name='name' className='rounded-lg py-2 px-3 outline-none border' onChange={handleChange} value={userData.name} />
                        </div>
                        <div className='flex flex-col mb-4'>
                            <label htmlFor="email" className='mb-1'>Email*</label>
                            <input type="email" id='email' name='email' className='rounded-lg py-2 px-3 outline-none border' onChange={handleChange} value={userData.email} />
                        </div>
                        {/* <div className='flex flex-col mb-4'>
                            <label htmlFor="password" className='mb-1'>Password</label>
                            <input type="text" id='password' name='password' className='rounded-lg py-2 px-3 outline-none border' onChange={handleChange} value={userData.password} />
                        </div> */}
                        <div className='flex flex-col mb-4'>
                            <label htmlFor="country" className='mb-1'>Country*</label>
                            <input type="text" id='country' name='country' className='rounded-lg py-2 px-3 outline-none border' onChange={handleChange} value={userData.country} />
                        </div>
                        <div className='flex flex-col mb-4'>
                            <label htmlFor="info" className='mb-1'>About</label>
                            <textarea name='info' id="info" value={userData.info} onChange={handleChange} className='border resize-none rounded-lg p-2 outline-none' rows={"7"} placeholder='Write something about yourself' />
                        </div>
                        {
                            socialList.map((item, i) => {
                                return (
                                    <div className='flex items-center w-full justify-between mb-4' key={i}>
                                        <img src={item.icon} alt={item.text} />
                                        <input type="text" name={item.text} id={item.text} className='border-b w-[90%] outline-none p-2 ' placeholder={`${item.text} url here`} value={userData[item.text]} onChange={handleChange} />
                                    </div>
                                )


                            })
                        }
                        <button className='w-full rounded-2xl mt-3 bg-[#4b6bfb] capitalize text-white py-2 font-medium text-lg hover:opacity-70'>Update</button>
                        <p className='mt-3 text-sm text-center'><Link className='text-[#4b6bfb]' to={"/"}>Back To Home</Link></p>
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

export default UpdateProfile