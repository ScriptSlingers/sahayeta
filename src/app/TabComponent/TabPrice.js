import React from 'react'

export default function TabPrice() {
  const header = {
    fontSize: "24px",
    fontWeight: "500",
    color: 'blue',
    fontFamily: "Poppins, sans-serif",

  }
  return (
    <>
      <h2 style={header}>Merocare Pricing Available:</h2>
      <p>Nrs 500 Live Consult</p>
      <p> Nrs 2000 OPD Home Visit</p>
      <p>Nrs 2000 Lab Test Visit</p>
      <p>Nrs 0 Visit Hospital</p>
      <h2 style={header}> Hospital Pricing</h2>
      <p> Hospital services prices are depends on your services used by hospital on normal visit or merocare visit hospital options.
      </p>
    </>

  )
}