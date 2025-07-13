"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import Authentication from './Authentication'
import { useAuthContext } from '../Provider'
import Link from 'next/link'

const Hearder = () => {

  const {user} = useAuthContext()

  return (
    <div className='p-4 shadow-md flex items-center justify-between'>
    <div className='flex items-center gap-3'>
        <Image src={'/Visual.png'} width={40} height={40} alt="logo image"/>
        <h2 className='text-2xl font-bold cursor-pointer'>Think Visuals</h2>
    </div>

    <div>
      {
        !user? <Authentication><Button className='cursor-pointer'>Get Started</Button></Authentication> : 
        <div className='flex items-center gap-3'>
          <Link href={'/create-new-video'}> 
            <Button className='cursor-pointer'>Create Video</Button>
          </Link>
           {user?.pictureURL && 
              <Image
               src={user?.pictureURL}
                alt="profileimage"
                width={40}
                height={40}
                className="rounded-full"
              />
            }
          </div>
      }
    </div>
    </div>
  )
}

export default Hearder