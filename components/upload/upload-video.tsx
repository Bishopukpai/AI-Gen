"use client"

import { uploadImage } from '@/server/upload-image'
import React from 'react'
import {useDropzone} from 'react-dropzone'
import { Card, CardContent } from '../ui/card'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { Image, Video } from 'lucide-react'
import { useImageStore } from '@/lib/image-store'
import { useLayerStore } from '@/lib/layer-store'


//install this later at night, remember to get the lottie.json file from his github
import Lottie from 'lottie-react'
import loadingAnimation from './animations/video-upload.json'
import { uploadVideo } from '@/server/upload-video'

const UploadVideo = () => {
    const setGenerating = useImageStore((state) => state.setGenerating)
    const activeLayer = useLayerStore((state) => state.activeLayer)
    const updateLayer = useLayerStore((state) => state.updateLayer)
    const setActiveLayer = useLayerStore((state) => state.setActiveLayer)


    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        maxFiles: 1,
        accept: {
            'video/mp4': ['.mp4', '.MP4']  
        },
        onDrop: async (acceptFiles, fileRejections) =>{
            if(acceptFiles.length) {
                const formData = new FormData()

                formData.append('video', acceptFiles[0])
                setGenerating(true)

               

                setActiveLayer(activeLayer.id)
                //STATE MANAGEMENT STUFF

                //Upload the Image to Cloudinary
                const res = await uploadVideo({video: formData})
               if(res?.data?.success){
                    const videoUrl = res.data.success.url
                    const thumbnail = videoUrl.replace(/\.[^/.]+$/, ".jpg")
                    updateLayer({
                        id:activeLayer.id,
                        url: res.data.success.url,
                        width: res.data.success.width,
                        height: res.data.success.height,
                        name: res.data.success.original_filename,
                        publicId: res.data.success.public_id,
                        format: res.data.success.format,
                        poster: thumbnail,
                        resourceType: res.data.success.resource_type
                    })
                    setActiveLayer(activeLayer.id)
                    setGenerating(false)
               }
               if(res?.data?.error){
                    setGenerating(false)
               }
            }
        }
    })

    if(!activeLayer.url)
  return (
    <Card
  {...getRootProps()}
  className={cn(
    "flex items-center justify-center mx-auto cursor-pointer hover:bg-secondary hover:border-primary transition-all ease-in-out",
    isDragActive ? "animate-pulse border-primary bg-secondary" : ""
  )}
>
  <CardContent className="flex flex-col items-center justify-center p-19 text-xs">
    <input {...getInputProps()} />
    <div className="flex items-center flex-col justify-center gap-4">
      <Lottie className="h-48" animationData={loadingAnimation} />
      <p className="whitespace-nowrap text-muted-foreground text-2xl">
        {isDragActive
          ? "Drag and drop your Video here"
          : "Start by uploading a Video"}
      </p>
      <p className="text-muted-foreground">
        Supported formats: mp4
      </p>
    </div>
  </CardContent>
</Card>
  )
}

export default UploadVideo