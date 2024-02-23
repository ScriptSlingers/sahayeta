"use client"
import 'leaflet/dist/leaflet.css';
import React from 'react'
import GoogleMapReact from 'google-map-react'
import {MapContainer,TileLayer,Marker,Popup} from 'react-leaflet'

import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
const AnyReactComponent = ({ text }) => <div>{text}</div>

function GoogleMap() {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  }

  return (
    // Important! Always set the container height explicitly
    <div>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyCDwsFqJWgKHG_31yLSWZ2MRZmDYXP5Y2w' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent text="My Marker" />
      </GoogleMapReact>
    </div>
  )
}

export default function OsmMap({
  longitude, latitude
}) {
  return (
    <MapContainer preferCanvas={true} center={[latitude, longitude]} zoom={13} scrollWheelZoom={true} className='h-80'>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[latitude, longitude]}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
</MapContainer>
  )
}

