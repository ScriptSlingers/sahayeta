'use client'

import { useSession } from 'next-auth/react'
import { useState } from 'react'

const UserProfile = () => {
  const [user, setUser] = useState('')
  const session = useSession()
  if (!session.data) {
    return <div>Loading...</div>
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()
    console.log('Form submitted!')
  }

  return (
    <>
      <div className="font-medium text-lg lg:text-2xl flex items-center">
        Profile
      </div>
      <div className="bg-gray-100 p-8">
        <div
          onClick={handleSubmit}
          className="max-w-2xl mx-auto bg-white p-4 shadow-lg rounded-lg"
        >
          <div>
            <h1>Welcome, {session?.data?.user?.name}</h1>
            <img
              src={session?.data?.user?.image || ''}
              alt={session?.data?.user?.name || ''}
            />
            <p>Email: {session?.data?.user?.email}</p>
            <p>Phone Number:9845952673</p>
            <p>Address: Madi-1 Baruwa</p>
            <p>
              Role: Admin
              <p>
                Bio:Hi my name is Anjali Poudel I'm a student of information
                technology and I am a passionate front-end developer. I possess
                a decent level of skill in Graphics Design, HTML, CSS and
                WordPress as well.{' '}
              </p>
              {/* <p>Bio: {session?.data?.user?.bio}</p>
                        <p>Phone Number: {session?.data?.user?.phoneNum}</p>
                        <p>Address: {session?.data?.user?.address}</p>
                        <p>Role: {session?.data?.user?.role}</p>
                        <p>Donate Amount:{session?.data?.user?.amount}</p> */}
            </p>
          </div>
        </div>
      </div>

      {/* <div className='grid grid-cols-3'>
                {user?.Users.map((user: any) => {
                    return (
                        <UserCard
                            key={user?.userId}
                            userId={user?.id}
                            userImageURL={user?.profileImage}
                            userName={user?.username}
                            userPhoneNumber={user?.phoneNum}
                            userBio={user?.bio}
                            userAddress={user?.name}
                            userEmail={user?.email}

                        />
                    )
                })}
            </div> */}
    </>
  )
}
export default UserProfile
