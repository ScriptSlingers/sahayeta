'use client'
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react'

const Test = () => {
    const session = useSession();

    if (session) {
        return (

            <div>SESSION:
                {JSON.stringify(session)}
                <Image alt={session?.data?.user?.name || ""}
                    src={session?.data?.user?.image || ""}
                    width={100}
                    height={100} />
                <button onClick={() => signIn('google')} className='bg-blue-500 p-4'>Signin</button>
            </div>

        )
    }
    return (
        <div> NULL</div>
    );
}


export default Test