import React, { useState } from 'react';


export default function CommentForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        comment: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };
    const container = {
        display: 'flex', flexDirection: 'column', gap: '10px'

    }
    const btn = {
        backgroundColor: 'blue',
        color: 'black',
        padding: '8px 16px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        marginTop: '10px',
        width: '100px',
        color: 'white'
    }

    const comment = {
        width: '850px',
        height: '150px'
    }
    const inputs = {
        display: 'flex', gap: '15px'
    }

    return (
        <form onSubmit={handleSubmit} style={container}>
            <div style={inputs}>
                <div>
                    <div>First Name:</div>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <div>Last Name:</div>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <div>Email:</div>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
            <div>
                <div>Comment:</div>
                <textarea
                    style={comment}
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    required
                />
            </div>
            <button style={btn} className="button">Submit</button>
        </form>
    );
};
