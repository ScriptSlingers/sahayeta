import { prisma } from '@sahayeta/app/lib'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/error'
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
        const body = JSON.stringify(credentials)
        try {
          const user = await fetch(`${process.env.NEXTAUTH_URL}/api/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
            },
            body: body
          })
            .then(res => res.json())
            .catch(error => {
              throw new Error('Error during fetch', error)
            })

          if (user) {
            return user
          } else {
            throw new Error('No user received from /api/login')
          }
        } catch (error) {
          console.error('Error during authorization:', error)
          throw new Error('AccessDenied') // Customize the error message if needed
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

    async jwt({ token }) {
      return token
    },

    signIn: async (session: any) => {
      try {
        if (!session.user.email) {
          throw new Error('Invalid User Details')
        }
        const existingUser = await prisma.user.findFirst({
          where: { email: session.user.email }
        })

        if (!existingUser) {
          await prisma.user.create({
            data: {
              username: session.user.email.split('@')[0],
              email: session.user.email,
              name: session.user.name,
              profileImage: session.user.image
            }
          })
        } else {
          return session.user
        }

        return null
      } catch (error) {
        throw new Error('Error during sign-in process')
      }
    }
  }
}
