import React from 'react'

export default function TabTreatment() {
    const header = {
        fontSize: "24px",
        fontWeight: "500",
        color: 'blue',
        fontFamily: "Poppins, sans-serif",

    }
    return (
        <>
            <h2 style={header}>Treatments Available:</h2>
            <p>Hernia </p>
            <p> Perianal abscess </p>
            <p>Pelvic organ prolapse</p>
            <p>Coloproctology</p>

        </>

    )
}