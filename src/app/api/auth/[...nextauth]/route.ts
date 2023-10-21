import NextAuth from 'next-auth'
import { authOptions } from '@sahayeta/app/lib'

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
