import { useSession, signIn, signOut } from 'next-auth/react'
export default function LoginButton() {
  const { data: session, status } = useSession()

  if (status === 'authenticated') {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
        <div>Access Token: {session.accessToken}</div>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      {/* <button onClick={() => signIn('github', { callbackUrl: 'http://localhost:3000' })}>Sign in (redirect)</button> */}
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}
