import { useSession, getSession } from 'next-auth/react'

export default function Page() {
  const { data: session } = useSession()

  if (session) {
    return (
      <>
        <h1>Protected server side Page</h1>
        <p>You can view this page because you are signed in as {session.user.name}</p>
      </>
    )
  }
  return 'Access Denied'
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context })
  return {
    props: {
      session
    }
  }
}
