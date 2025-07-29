"use client"

import { SidebarProvider } from '@/components/ui/sidebar'
import React, { useEffect } from 'react'
import AppHeader from './_components/AppHeader'
import { useAuthContext } from '../Provider'
import { useRouter } from 'next/navigation'
import AppSidebar from './_components/AppSidebar'

const DashboardProvider: React.FC<{ children: React.ReactNode }> =({ children }) =>{
    const user = useAuthContext()
    const router = useRouter()
    useEffect(() => {
       user && CheckedUserAuthenticated()
    },[user])

    const CheckedUserAuthenticated = () => {
        if(!user){
            router.replace('/')
        }
    }
  return (
    <SidebarProvider>
        <AppSidebar />
        <div className='w-full'>
            <AppHeader />
            <div className='p-10'>
                {children}
            </div>
        </div>
    </SidebarProvider>
  )
}

export default DashboardProvider