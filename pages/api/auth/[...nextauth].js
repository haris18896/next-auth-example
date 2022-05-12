// *************** Simple Initialization ***************

import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { signOut } from 'next-auth/react'

export default NextAuth({
  theme: {
    colorScheme: 'dark', // "auto" | "dark" | "light"
    brandColor: '#525289', // Hex color code
    logo: '' // Absolute URL to image
  },
  // pages: {
  //   signIn: '/login'
  //   // signIn: '/api/auth/email-signin'
  //   // signIn: '/api/auth/credentials-signin'
  // },
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
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    async signin({ user, account, profile, email, credentials }) {
      const isAllowedToSignIn = true
      if (isAllowedToSignIn) {
        return true
      } else {
        return false
      }
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
  logger: {
    error(code, metadata) {
      console.error(code, metadata)
    },
    warn(code) {
      console.warn(code)
    },
    debug(code, metadata) {
      console.debug(code, metadata)
    }
  },

  jwt: {
    maxAge: 60 * 60 * 24 * 30
  }
})
