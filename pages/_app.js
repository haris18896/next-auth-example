import '../styles/globals.css'
import { SessionProvider, useSession } from 'next-auth/react'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  console.log('component auth', Component.auth)
  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  )
}

function Auth({ children }) {
  const { status } = useSession({ required: true })

  if (status === 'loading') {
    return <h3>Loading....</h3>
  }

  return children
}

export default MyApp
