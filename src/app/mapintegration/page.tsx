'use client'
import GoogleMap from '@sahayeta/components/MapComponent'
import dynamic from 'next/dynamic'
const OsmMap = dynamic(() => import('@sahayeta/components/MapComponent'), {
  ssr: false
})
function MapIntegration() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f9f4f1] ">
      <GoogleMap />
    </div>
  )
}

export default MapIntegration
