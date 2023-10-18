import NextAuth from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '../../lib/prismadb'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  debug: true,
  secret: process.env.SECRET,
  adapter: PrismaAdapter(prisma),

  pages: {
    signIn: '/login',
    error: '/error',
    signOut: '/logout'
  },
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        session.user['id'] = token.sub
        const updatedUser = await prisma.user.findUnique({
          where: {
            id: token.sub
          },
          select: {
            role: true
          }
        })
        session.user['role'] = updatedUser.role
        return session
      }
    },
    async jwt({ token }) {
      return token
    },
    async signIn() {
      return true
    }
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    }),
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'username'
        },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials, req) => {
        const user = await fetch(`${process.env.NEXTAUTH_URL}/api/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            accept: 'application/json'
          },
          body: Object.entries(credentials)
            .map(e => e.join('='))
            .join('&')
        })
          .then(res => res.json())
          .catch(err => {
            return null
          })
        if (user) {
          return user
        } else {
          return null
        }
      }
    }),
  ],
  session: {
    // Set to jwt in order to CredentialsProvider works properly
    strategy: 'jwt'
  }
}

export default NextAuth(authOptions)
