'use client';
import React, { useState } from 'react';

export default function DonationForm() {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageUpload = (event: any) => {
        const image = event.target.files[0];
        setSelectedImage(image);
    };

    const [formData, setFormData] = useState({
        selectedImage: null,
        name: "",
        address: "",
        email: "",
        phoneNumber: "",
        donationType: "",
        donationAmount: "",
        donorsNotes: ""
    });



    const handleChange = (event: any) => {
        fetch('https://dummyjson.com/posts/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: 'someone.',
                userId: 5,

            })
        })
            .then(res => res.json())
            .then(console.log);
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();


        fetch('https://dummyjson.com/posts/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: 'someone.',
                userId: 5,

            })
        })
            .then(res => res.json())
            .then(console.log);

    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white border rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Title of the Project</h2>
            <form onSubmit={handleSubmit} >

                <div className="mb-4">

                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="imageUpload"
                    >
                        Upload Image
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="imageUpload"
                        onChange={handleImageUpload}
                    />
                    {selectedImage && (
                        <img
                            src={URL.createObjectURL(selectedImage)}
                            alt="Selected"
                            className="mt-2"
                        />
                    )}
                </div>
                <div className="flex gap-8">
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"

                        >
                            Name
                        </label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Enter your Fullname"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"

                        >
                            Address
                        </label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Enter  Address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </div>{' '}
                </div>
                <div className="flex gap-8">
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"

                        >
                            Email
                        </label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>{' '}
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"

                        >
                            Phone Number
                        </label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Enter Phone Number"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                        />
                    </div>
                </div>


                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"

                    >
                        Type of Donation
                    </label>
                    <div>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                className="form-radio h-5 w-5 text-blue-600"
                                name="donationType"
                                value="money"
                            />
                            <span className="ml-2">Money</span>
                        </label>
                        <label className="inline-flex items-center ml-6">
                            <input
                                type="radio"
                                className="form-radio h-5 w-5 text-blue-600"
                                name="donationType"
                                value="goods"
                            />
                            <span className="ml-2">Goods</span>
                        </label>
                        <label className="inline-flex items-center ml-6">
                            <input
                                type="radio"
                                className="form-radio h-5 w-5 text-blue-600"
                                name="donationType"
                                value="services"
                            />
                            <span className="ml-2">Services</span>
                        </label>
                    </div>
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"

                    >
                        Donation Amount (Rs.)
                    </label>
                    <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Enter amount"
                        value={formData.donationAmount}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="amount"
                    >
                        Doners notes
                    </label>
                    <textarea
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Notes...."
                        value={formData.donorsNotes}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex justify-end gap-3">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Submit
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                    >
                        Cancel
                    </button>
                </div>

            </form>
        </div>
    )
}












// function PostDataComponent() {
//     const [title, setTitle] = useState('');
//     const [userId, setUserId] = useState('');
//     // Add state for other data properties if needed

//     const handleTitleChange = (event: any) => {
//         setTitle(event.target.value);
//     };

//     const handleUserIdChange = (event: any) => {
//         setUserId(event.target.value);
//     };

//     // Add handlers for other data properties if needed

//     const postData = () => {
//         const url = 'https://jsonplaceholder.typicode.com/posts';

//         fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 title: title,
//                 userId: userId,
//                 /* include other data dynamically */
//             }),
//         })
//             .then((res) => res.json())
//             .then(console.log)
//             .catch((error) => console.error('Error:', error));
//     };

//     return (
//         <div>
//             <label>
//                 Title:
//                 <input type="text" value={title} onChange={handleTitleChange} />
//             </label>
//             <br />
//             <label>
//                 User ID:
//                 <input type="text" value={userId} onChange={handleUserIdChange} />
//             </label>
//             {/* Add input fields for other data properties if needed */}
//             <br />
//             <button onClick={postData}>Post Data</button>
//         </div>
//     );
// }

// export default PostDataComponent;

