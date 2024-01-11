import React from 'react'

const Button = ({ text, click }) => {
    return (
        <div><span className='bg-[#4b6bfb] p-2 text-white capitalize rounded-md cursor-pointer' onClick={() => click()}>{text}</span></div>
    )
}

export default Button