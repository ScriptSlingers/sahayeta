import { prisma } from '@sahayeta/lib'
import { compare, hash } from 'bcryptjs'
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
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'email@example.com'
        },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials, req) => {
        const generatedRandomKey = [...Array(10)]
          .map(() => Math.random().toString(36).charAt(2))
          .join('')

        if (!credentials?.email || !credentials.password) {
          return null
        }
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email
          }
        })
        if (!user || !(await compare(credentials.password, user.password!))) {
          return null
        }
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          randomKey: generatedRandomKey
        }
      }
    })
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (token.sub) {
        const userDetails = await prisma.user.findFirst({
          where: { email: session?.user?.email },
          select: {
            id: true,
            role: true
          }
        })
        session.user['role'] = userDetails.role

        return {
          ...session,
          user: {
            ...session.user,
            id: token.id,
            randomKey: token.randomKey
          }
        }
      }
    },
    async jwt({ token, account, user }) {
      if (account && user) {
        if (account.provider === 'google') {
          let dbUser = await prisma.user.findFirst({
            where: { email: user.email }
          })
          if (!dbUser) {
            dbUser = await prisma.user.create({
              data: {
                email: user.email,
                name: user.name,
                profileImage: user.image,
                username: user.email.split('@')[0],
                role: 'donor'
              }
            })
          }
          token.id = dbUser.id
          token.email = dbUser.email
          token.role = dbUser.role
        }
      }
      return token
    }
  },
  secret: process.env.NEXTAUTH_SECRET
}
