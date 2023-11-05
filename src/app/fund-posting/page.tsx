'use client';

import { useState } from "react";

export default function DonationForm() {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageUpload = (event) => {
        const image = event.target.files[0];
        setSelectedImage(image);
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white border rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Title of the Project</h2>
            <form>
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
                            htmlFor="amount"
                        >
                            Name
                        </label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Enter your Fullname"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="amount"
                        >
                            Address
                        </label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Enter  Address"
                        />
                    </div>{' '}
                </div>
                <div className="flex gap-8">
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="amount"
                        >
                            Email
                        </label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Enter your email"
                        />
                    </div>{' '}
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="amount"
                        >
                            Phone Number
                        </label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Enter Phone Number"
                        />
                    </div>
                </div>


                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="donationType"
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
                        htmlFor="amount"
                    >
                        Donation Amount (Rs.)
                    </label>
                    <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Enter amount"
                    />
                </div>{' '}

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
