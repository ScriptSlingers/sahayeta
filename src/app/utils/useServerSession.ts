import { authOptions } from '@sahayeta/app/lib'
import { getServerSession } from 'next-auth'

type User = {
  name?: string
  email?: string
  image?: string
  id?: string
  role?: string
}

export const useServerSession = async () => {
  const session = await getServerSession(authOptions)

  return session?.user as User
}
