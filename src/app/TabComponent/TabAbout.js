import React from 'react'

export default function TabAbout() {
    const content = {
        color: "#0F52BA",
        fontWeight: "300",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        fontFamily: "Poppins, sans-serif",
    };

    const about = {
        fontSize: "14px",
        fontWeight: "300",
    };
    const title = {
        fontSize: "18px",
        fontWeight: "500",
    };
    const text = {
        fontSize: "14px",
        fontWeight: "300",
    };
    const emergency = {
        color: "red",
        fontSize: "14px",
        fontWeight: "300",
    };
    return (
        <div style={content}>
            <span style={about}>
                Dr. Rashmi Manjunath is a Dentist,Cosmetic/Aesthetic Dentist and
                Restorative Dentist in JP Nagar, Bangalore and has an experience
                of 10 years in these fields. Dr. Rashmi Manjunath practices at
                Partha Dental Skin Hair in JP Nagar, Bangalore. She completed BDS
                from Rajiv Gandhi University of Health Sciences in 2013. Some of
                the services provided by the doctor are: Acrylic Partial
                Denture,Dental Fillings, Acrylic prosthesis,Maxillofacial
                Prosthetics and Veneers / Laminates etc.
            </span>
            <span style={title}> 31 years of experience overall</span>
            <span style={title}> Awards:</span>
            <span style={text}> Kantipur Hospital award </span>
            <span style={title}> Contact:</span>
            <span style={text}> Chitwan Medical College (CMC)</span>
            <span style={text}>

                Narayani,Chitwan-Bharatpur,Bharatpur-10,CMC Road
            </span>
            <span style={text}>Phone:44444444, 444444434</span>
            <span style={emergency}> Emergency Number: 0453636363</span>
        </div>
    )
}
