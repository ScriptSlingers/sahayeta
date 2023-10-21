import { prisma } from '@sahayeta/app/lib'
import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
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
    async jwt({ token, account }: any) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }: any) {
      session.user.id = token.id
      return session
    },
    async signIn(user: any) {
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
          return true
        }
        return true
      } catch (error) {
        throw new Error('Error during sign-in process')
      }
    }
  }
}
