"use client"
import { useClientSession } from '@sahayeta/utils';
import axios from 'axios';
import Image from 'next/image';
import { useState, useEffect } from 'react';

type loggedInUser = {
    id: string
    name: string
    orgName: string
    profileImage: string
    email: string
    role: string
    bio: string
    phoneNum: string
    address: string
    dob: string
    ctzImg: string
    balance: string
}

const page = () => {

    const currentUser = useClientSession();
    const [loggedInUser, setLoggedInUser] = useState<loggedInUser | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (currentUser?.id) {
                    const response = await axios.get(`/api/users/${currentUser.id}`);
                    const res = response.data;
                    setLoggedInUser(res);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, [currentUser?.id]);
    const dobDate = loggedInUser?.dob ? new Date(loggedInUser.dob) : null;
    const formattedDate = dobDate
        ? dobDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        : 'Invalid Date';

    return (
        <>

            <div className="bg-gray-100 p-8">
                <div
                    onClick={(event) => {
                        event.preventDefault();
                        console.log('Form submitted!');
                    }}
                    className="max-w-2xl mx-auto bg-white p-4 shadow-lg rounded-lg"
                >
                    <div>
                        <h1>Welcome, {loggedInUser?.name}</h1>
                        <div className="object-cover w-32 h-32 rounded overflow-hidden">
                            <Image
                                src={loggedInUser?.profileImage || ""}
                                width={200}
                                height={200}
                                alt={loggedInUser?.name}
                                quality={100}
                            />
                        </div>
                        <p>Email: {loggedInUser?.email}</p>
                        <p>Role: {loggedInUser?.role}</p>
                        <p>Bio: {loggedInUser?.bio}</p>
                        <p>Phone Number: {loggedInUser?.phoneNum}</p>
                        <p>Address: {loggedInUser?.address}</p>

                        {dobDate && (
                            <p> Date of Birth: {formattedDate}</p>
                        )}
                        <p>Citizen Image: </p>

                        <p>Balance: {loggedInUser?.balance}</p>
                        <p>Organization Name: {loggedInUser?.orgName}</p>
                        <div className="object-cover w-32 h-32 rounded overflow-hidden">
                            <Image
                                src={loggedInUser?.ctzImg || ""}
                                width={200}
                                height={200}
                                alt={loggedInUser?.name}
                                quality={100}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default page;
