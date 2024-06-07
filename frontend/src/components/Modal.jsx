import React from 'react'
import ReactDOM from 'react-dom'
const Modal = ({ children }) => {
    return ReactDOM.createPortal(<div className='absolute text-center flex items-center justify-center w-full h-full top-0 left-0 bg-black bg-opacity-70 overflow-none'>
        {children}
    </div>, document.getElementById("portal"))
}

export default Modal