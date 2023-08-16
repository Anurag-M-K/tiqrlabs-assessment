import React, { useState } from 'react'

function PreviewImage({file}) {
    const [ preview , setPreview ] = useState({})

    if(file) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            setPreview(reader.result)
        }
    }
  return (
    <div>
        <img className='w-20 h-20' src={preview} alt="image" />
    </div>
  )
}

export default PreviewImage