import React from 'react'

const Modal = ({ isVisible, onClose, children }) => {

  if ( !isVisible ) return null;
  
  const handleClose = (e) => {
    if (e.target.id === 'wrapper') onClose();
  }

  return (
    <>
    <div className='fixed inset-0 bg-forrest bg-opacity-25 backdrop-blur-sm flex rounded-xl shadow-md justify-center items-center' id='wrapper' onClick={handleClose}>
      <div className='md:w-[50%] md:mx-auto flex flex-col'>
          <button className='text-xl text-mahogany place-self-end' onClick={() => onClose()}>close</button>
          <div className='bg-ivory/90 rounded-lg'>{ children }</div>
      </div>
    </div>
    </>
    )
}

export default Modal