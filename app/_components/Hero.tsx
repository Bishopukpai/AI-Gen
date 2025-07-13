"use client"
import { Button } from '@/components/ui/button'
import React from 'react'
import Authentication from './Authentication'

const Hero = () => {
  return (
    <div className='p-10 flex flex-col items-center justify-center mt-24 md:px-20 lg:px-20 xl:px-23'>
        <h2 className='font-bold text-6xl text-center'>AI-Powered Image & Video Creation Hub</h2>
        <p className='mt-4 text-2xl text-center text-gray-500'>Create and Edit Stunning ✨ Videos 📹 and Images 🖼️ in Seconds. Let AI 🤖 help you create scripts Images
            and engaging videos for your platform with ease 😃
        </p>

        <div className='mt-7 flex gap-8'>
            <Button className='cursor-pointer' size='lg' variant='secondary'>Explore Features</Button>
            <Authentication>
                <Button className='cursor-pointer' size='lg'>Start Creating</Button>
            </Authentication>
        </div>
    </div>
  )
}

export default Hero