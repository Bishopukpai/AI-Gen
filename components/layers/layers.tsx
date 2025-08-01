'use client'

import { useLayerStore } from "@/lib/layer-store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { cn } from "@/lib/utils"
import { useImageStore } from "@/lib/image-store"
import { Button } from "../ui/button"
import { ArrowRight, Images, Layers2 } from "lucide-react"
import LayerImage from "./layer-image"
import LayerInfo from "./layer-info"
import { useMemo } from "react"
import Image from "next/image"

export default function Layers() {
     const layers = useLayerStore((state) => state.layers)
     const activeLayer = useLayerStore((state) => state.activeLayer)
     const addLayer = useLayerStore((state) => state.addLayer)
     const setActiveLayer = useLayerStore((state) => state.setActiveLayer)
     const generating = useImageStore((state) => state.generating)
     const layerComparisonMode = useLayerStore((state) => state.layerComparisonMode)
     const setLayerComparisonMode = useLayerStore((state) => state.setLayerComparisonMode)
     const comparedLayers = useLayerStore((state) => state.comparedLayers)
     const toggleComparedLayers = useLayerStore((state) => state.toggleComparedLayer)
     const setComparedLayers = useLayerStore((state) => state.setComparedLayers)


     const getLayerName = useMemo(
        () => (id: string) => {
            const layer = layers.find((l) => l.id === id)
            return layer ? layer.url : "Nothing here"
        },
        [layers]
     )

     const visibleLayers = useMemo(
        () => layerComparisonMode ? layers.filter((layer) => layer.url && layer.resourceType === 'image') : layers,
        [layerComparisonMode, layers]
     )

     return (
        <Card className="basis-[360px] shrink-0 scrollbar-thin scrollbar-track-secondary overflow-y-scroll scrollbar-thumb-primary scrollbar-thumb-rounded-full scrollbar-track-rounded-full overflow-x-hidden relative flex flex-col shadow-2xl">
            <CardHeader className="sticky top-0 z-50 px-4 py-6 min-h-24 bg-card shadow-sm">
              {
                layerComparisonMode ? (
                    <div>
                      <CardTitle className="text-sm pb-2">Comparing....</CardTitle>
                      <CardDescription className="flex gap-2 items-center">
                        <Image alt="compare" width={32} height={32} src={getLayerName(comparedLayers[0]) as string} />
                        {comparedLayers.length > 0 && <ArrowRight />}
                        {comparedLayers.length > 1 ? (
                            <Image alt= "compare" width={32} height={32} src={getLayerName(comparedLayers[1]) as string} />
                        ) : (
                            "Nothing Here"
                        )}
                      </CardDescription>
                        
                    </div>
                ): null}
                <div>
                    <CardTitle className="text-sm">{activeLayer.name || 'Layers'}</CardTitle>
                    {activeLayer.width && activeLayer.height ? (
                        <CardDescription>
                            {activeLayer.width}x{activeLayer.height}
                        </CardDescription>
                    ) : null}
                </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col ">
                {visibleLayers.map((layer, index) => (<div className={cn('cursor-pointer ease-in-out hover:bg-secondary border border-transparent', {'animate-pulse': generating, 'bg-accent' : layerComparisonMode ? comparedLayers.includes(layer.id) : activeLayer.id === layer.id})} key={layer.id} onClick={() => {
                    if(generating) return 
                    if(layerComparisonMode){
                        toggleComparedLayers(layer.id)
                    }else {
                        setActiveLayer(layer.id)
                    }
                }}>
                    <div className="relative p-4 flex items-center">
                        <div className="flex gap-36 text-xs font-medium justify-center">
                            {!layer.url ? (
                                <p className="text-xs py-2 font-medium">New Layer</p>
                            ) : null}
                            <div className="px-3 flex gap-36">

                            <LayerImage layer={layer}/>
                            <LayerInfo layer={layer} layerIndex={index}/>
                            </div>
                        </div>
                    </div>
                </div>))}
            </CardContent>
            <div className="sticky buttom-0 bg-card flex gap-2 px-4 p-4 shrink">
                <Button onClick={() => {
                    addLayer({
                        id: crypto.randomUUID(),
                        url: "",
                        height: 0,
                        width: 0,
                        publicId: "",
                        name: "",
                        format: ""
                   })
                }} className="w-[50%] flex items-center gap-2" variant={"outline"}><span>Create Layer</span><Layers2 className="text-secondary-foreground" size={18}/></Button>
                <Button className="w-[50%] flex items-center gap-2" onClick={() => {if(layerComparisonMode){setLayerComparisonMode(!layerComparisonMode)} else {setComparedLayers([activeLayer.id])}}} disabled={!activeLayer.url || activeLayer.resourceType === 'video'}>
                    <span>{layerComparisonMode ? 'Stop comparison' : 'Compare Layers'}</span>
                    {!layerComparisonMode && (
                        <Images className="text-black" size={14}/>
                    )}
                </Button>
            </div>
        </Card>
    )
}