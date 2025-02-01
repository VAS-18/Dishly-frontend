import Image from 'next/image'
import React from 'react'

const Loading = () => {
  return (
    <div className='flex items-center justify-center min-h-screen'> 
        <Image>
            src="/public/Loading.gif"
            alt="Loading"
            width={100}
            height={100}
            priority={true}
        </Image>
    </div>
  )
}

export default Loading