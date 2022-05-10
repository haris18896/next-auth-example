// *************** Simple Initialization ***************

import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { signOut } from 'next-auth/react'

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken
      return session
    },
    async redirect({ url, baseUrl }) {
      if (url.includes('/api/auth/')) {
        return baseUrl
      }
      return url
    },
    async signin({ user, account, profile, email, credentials }) {
      // do something with the user
      if (user) {
        user.accessToken = account.access_token
      }
      return true
    },
    events: {
      async signIn(message) {
        /* on successful sign in */
        console.log('signIn', message)
      },
      async signOut(message) {
        /* on signout */
        console.log('signOut', message)
      }
    }
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30
  }
})
