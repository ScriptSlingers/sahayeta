import { prisma } from '@sahayeta/app/lib'
import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/test'
  },
  session: {
    strategy: 'jwt'
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    })
  ],
  callbacks: {
    session: async ({ session }) => {
      try {
        const userDetails = await prisma.user.findFirst({
          where: { email: session.user.email },
          select: {
            id: true,
            name: true,
            username: true,
            email: true,
            profileImage: true
          }
        })
        return {
          ...session,
          user: {
            ...session.user,
            userDetails
          }
        }
      } catch (error) {
        console.error('Error fetching user details:', error)
        return session
      }
    },

    jwt: ({ token, user }) => {
      if (user) {
        const newUser = user
        return {
          ...token,
          id: newUser.id
        }
      }
      return token
    },

    signIn: async (user: any) => {
      try {
        const existingUser = await prisma.user.findFirst({
          where: { email: user.profile.email }
        })
        if (!existingUser) {
          await prisma.user.create({
            data: {
              username: user.profile.email.split('@')[0],
              email: user.profile.email,
              name: user.profile.name,
              profileImage: user.profile.picture
            }
          })
          return user
        }
        return user
      } catch (error) {
        throw new Error('Error during sign-in process')
      }
    }
  }
}
