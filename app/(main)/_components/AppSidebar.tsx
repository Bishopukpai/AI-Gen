"use client"
import React from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Edit, GemIcon, HomeIcon, ImageIcon, LayoutDashboardIcon, LucideFileVideo, Video, WalletCards } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuthContext } from '@/app/Provider'
import { ModeToggle } from '@/components/theme/mode-toggle'

const MenuItems = [
    {
        title: "Home",
        url: "/",
        icon: HomeIcon
    },
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboardIcon
    },
    {
        title: "Create Video Script",
        url: "/create-video-script",
        icon: LucideFileVideo
    },
    {
        title: "Edit",
        url: "/edit",
        icon: Edit
    },
    {
        title: "Generate Video",
        url: "/generate-video",
        icon: Video
    },
    {
        title: "Generate-Image",
        url: "/generate-image",
        icon: ImageIcon
    },
    {
        title: "Billings",
        url: "/billings",
        icon: WalletCards
    }
]

const AppSidebar = () => {
    const path = usePathname()
    const {user} = useAuthContext()
  return (
    <Sidebar>
      <SidebarHeader>
        <div>
        <div className='flex items-center gap-3 w-full justify-center mt-5'>
         <Image src={'/Visual.png'} alt='logo' width={40} height={40}/>
         <h2 className='font-bold text-2xl cursor-pointer'>Think Visuals</h2>
        </div>
        <div className="pb-12 text-center">
          <ModeToggle />
        </div>
        <h3 className='text-lg text-gray-500 text-center mt-3'>AI Video Creator & Editor</h3>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
            <SidebarGroupContent>
               <div className='mx-5'>
                    <Link href='/generate-video'>  
                        <Button className='w-full cursor-pointer'>+ Create New Video</Button>
                    </Link>
                </div>
                <SidebarMenu>
                    {MenuItems.map((menu, index) => (
                        <SidebarMenuItem className='mt-5' key={index}>
                            <SidebarMenuButton isActive={path == menu.url} className='p-5'>
                                <Link href={menu.url} className='flex items-center gap-4 p-3'>
                                    <menu.icon />
                                    <span>{menu.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
         <div className='p-5 border rounded-lg mb-6'>
             <div className='flex items-center justify-between'>
                <h2>You are on</h2>
                <h2>{user?.credits}</h2>
             </div>
             <Button className='w-full mt-3'>Upgrade Tier</Button>
         </div>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar