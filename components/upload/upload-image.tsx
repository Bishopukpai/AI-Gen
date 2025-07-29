'use client'

import React from 'react'
import { useDropzone } from 'react-dropzone'
import { Card, CardContent } from '../ui/card'
import { cn } from '@/lib/utils'
import { useImageStore } from '@/lib/image-store'
import { useLayerStore } from '@/lib/layer-store'
import Lottie from 'lottie-react'
import loadingAnimation from './animations/image-upload.json'

const UploadImage = () => {
  const setGenerating = useImageStore((state) => state.setGenerating)
  const activeLayer = useLayerStore((state) => state.activeLayer)
  const updateLayer = useLayerStore((state) => state.updateLayer)
  const setActiveLayer = useLayerStore((state) => state.setActiveLayer)

  // ✅ Upload image via fetch to /api/upload
  const uploadImage = async (formData: FormData) => {
    try {
      const res = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) throw new Error('Upload failed')
      return await res.json()
    } catch (err) {
      console.error('Error uploading image:', err)
      return { error: true }
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    accept: {
      'image/png': ['.png'],
      'image/jpg': ['.jpg'],
      'image/webp': ['.webp'],
      'image/jpeg': ['.jpeg'],
    },
    onDrop: async (acceptFiles) => {
      if (acceptFiles.length) {
        const formData = new FormData()
        formData.append('image', acceptFiles[0])

        const objectUrl = URL.createObjectURL(acceptFiles[0])
        setGenerating(true)

        updateLayer({
          id: activeLayer.id,
          url: objectUrl,
          width: 0,
          height: 0,
          name: 'uploading',
          publicId: '',
          format: '',
          resourceType: 'image',
        })

        setActiveLayer(activeLayer.id)

        const res = await uploadImage(formData)

        if (res?.success) {
          updateLayer({
            id: activeLayer.id,
            url: res.success.url,
            width: res.success.width,
            height: res.success.height,
            name: res.success.original_filename,
            publicId: res.success.public_id,
            format: res.success.format,
            resourceType: res.success.resource_type,
          })
        }

        setGenerating(false)
      }
    },
  })

  if (!activeLayer.url)
    return (
      <Card
        {...getRootProps()}
        className={cn(
          'flex items-center cursor-pointer hover:bg-secondary hover:border-primary transition-all ease-in-out',
          isDragActive ? 'animate-pulse border-primary bg-secondary' : ''
        )}
      >
        <CardContent className="flex flex-col items-center justify-center p-19 text-xs">
          <input {...getInputProps()} />
          <div className="flex items-center flex-col justify-center gap-4">
            <Lottie className="h-48" animationData={loadingAnimation} />
            <p className="whitespace-nowrap text-muted-foreground text-2xl">
              {isDragActive
                ? 'Drag and drop your image here'
                : 'Start by uploading an image'}
            </p>
            <p className="text-muted-foreground">
              Supported formats: jpeg, jpg, png, webp
            </p>
          </div>
        </CardContent>
      </Card>
    )

  return null
}

export default UploadImage
