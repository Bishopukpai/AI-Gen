"use client"
import React from 'react'
import DashboardProvider from './provider'

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
         <DashboardProvider>
            {children}
         </DashboardProvider>
    </div>
  )
}

export default DashboardLayout 