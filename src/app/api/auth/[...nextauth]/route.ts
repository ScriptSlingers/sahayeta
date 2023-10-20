import { prisma } from '@sahayeta/app/lib/prismadb'
import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/test'
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    })
  ],
  callbacks: {
    async signIn(user: any) {
      const existingUser = await prisma.user.findFirst({
        where: { id: user.id }
      })

      if (!existingUser) {
        await prisma.user.create({
          data: {
            username: user.email.split('@')[0],
            email: user.email,
            name: user.name,
            profileImage: user.image
          }
        })
        return true
      }
      return user
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
