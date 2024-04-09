'use client'
import 'leaflet/dist/leaflet.css'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'

export default function OsmMap({ longitude, latitude, address }) {
  return (
    <MapContainer
      preferCanvas={true}
      center={[latitude, longitude]}
      zoom={13}
      scrollWheelZoom={true}
      className="h-80"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]}>
        <Popup>{address}</Popup>
      </Marker>
    </MapContainer>
  )
}
