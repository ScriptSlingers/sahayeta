import { prisma } from '@sahayeta/app/lib'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
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
    }),

    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        username: {
          label: 'Email',
          type: 'text',
          placeholder: 'Email address'
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: '*************'
        }
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
          .catch(error => {
            return error
          })
        if (user) {
          return user
        } else {
          return null
        }
      }
    })
  ],
  callbacks: {
    session: async ({ session }) => {
      try {
        const userDetails = await prisma.user.findFirst({
          where: { email: session.user.email },
          select: {
            id: true,
            role: true
          }
        })

        session.user['id'] = userDetails.id
        session.user['role'] = userDetails.role
        return session
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
