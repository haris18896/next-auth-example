import '../styles/globals.css'
import { SessionProvider, useSession } from 'next-auth/react'
import ErrorBoundary from '../components/ErrorBoundary'
import { Suspense } from 'react'

export function reportWebVitals(metric) {
  console.log(metric.name, metric)
}

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  console.log('component auth', Component.auth)
  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth>
          <ErrorBoundary FallbackComponent={'ErrorFallback'}>
            <Suspense fallback={<h3>Loading...</h3>}>
              <Component {...pageProps} />
            </Suspense>
          </ErrorBoundary>
        </Auth>
      ) : (
        <ErrorBoundary FallbackComponent={'ErrorFallback'}>
          <Suspense fallback={<h3>Loading...</h3>}>
            <Component {...pageProps} />
          </Suspense>
        </ErrorBoundary>
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
