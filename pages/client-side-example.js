import { useSession, getSession } from 'next-auth/react'

export default function Page() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <h4>Loading....</h4>
  }

  if (status === 'authenticated') {
    return <h4>The user is authenticated</h4>
  }

  if (status === 'unauthenticated') {
    return <h4>The user is not authenticated</h4>
  }

  return (
    <>
      <h1>Protected Page</h1>
      <p>You can view this page because you are signed in {session.user.name}</p>
    </>
  )
}
