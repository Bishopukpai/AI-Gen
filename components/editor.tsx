'use client'


import SidebarLayout from "@/app/(main)/layout"
import ActiveImage from "./Active-image"
import Layers from "./layers/layers"

// import Loading from "./loading-screen"

import UploadForm from "./upload/upload-form"
import Toolbar from "./toolbar"
import { useLayerStore } from "@/lib/layer-store"
import ImageTools from "./toolbar/image-toolbar"
import VideoTools from "./toolbar/video-toolbar"



export default function Editor(){
     const activeLayer = useLayerStore((state) => state.activeLayer)
      
    return(
        <>
        <div className="flex flex-col gap-5"> 
            {/* <Loading /> */}

            <UploadForm />
            <ActiveImage />
            <div>
                {activeLayer.resourceType === "image" ? <ImageTools/> : null}
                {activeLayer.resourceType === "video" ? <VideoTools/> : null}
            </div>
            <Layers />
        </div>
        </>
    )
}
