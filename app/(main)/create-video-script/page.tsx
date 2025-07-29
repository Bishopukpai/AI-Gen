"use client"
import React, { useState } from 'react'
import Topic from './_components/Topic'


const CreateNewVideo = () => {


  return (
    <div>
      <h2 className='text-3xl'>Create Video Script</h2>
      <div className='mt-8'>
         <div className='col-span-2 p-7 border rounded-xl'>
           {/** Topic & Script */}
           <Topic/>
          
         </div>
         <div>
           
         </div>
      </div>
    </div>
  )
}

export default CreateNewVideo