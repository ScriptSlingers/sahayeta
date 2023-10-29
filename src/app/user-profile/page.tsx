'use client'

import { useSession } from 'next-auth/react';
import React from 'react'

const UserProfile = () => {
    const session = useSession();

    if (!session.data) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="font-medium text-lg lg:text-2xl flex items-center">
                Profile
            </div>
            <div className="bg-gray-100 p-8">
                <div className="max-w-2xl mx-auto bg-white p-4 shadow-lg rounded-lg">

                    <div>
                        <h1>Welcome, {session?.data?.user?.name}</h1>
                        <p>Email: {session?.data?.user?.email}</p>
                        <img src={session?.data?.user?.image || ""} alt={session?.data?.user?.name || ""} />
                        <p>Bio: {session?.data?.user?.bio}</p>


                    </div>

                </div>
            </div>
        </>
    )
}
export default UserProfile