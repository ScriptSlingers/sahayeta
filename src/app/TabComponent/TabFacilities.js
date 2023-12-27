import React from 'react'

export default function TabFacilities() {
    const header = {
        fontSize: "24px",
        fontWeight: "500",
        color: 'blue',
        fontFamily: "Poppins, sans-serif",

    }
    return (
        <>
            <h2 style={header}>Facilities</h2>
            <p>Pathology</p>
            <p> Attendant Services </p>
            <p>Free ola uber Services</p>
            <p>Housekeeping</p>
        </>

    )
}
