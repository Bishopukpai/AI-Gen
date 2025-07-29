"use client"
import Layers from '@/components/layers/layers'
import { ImageStore } from '@/lib/image-store'
import { LayerStore } from '@/lib/layer-store'
import React from 'react'


const DashboardPage = () => {
  return (
   <LayerStore.Provider initialValue={{
      layerComparisonMode: false,
      layers: [
      {
        id: crypto.randomUUID(),
        url: "",
        height: 0,
        width: 0,
        publicId: "",
      }
    ]
  }}>
      <ImageStore.Provider initialValue={{generating: false}}>
        <main className="h-full">
           <Layers />
        </main>
      </ImageStore.Provider>
    </LayerStore.Provider>
  )
}

export default DashboardPage