import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function Admin() {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      return <Link href='/api/auth/signin'>Login</Link>
    }
  })

  if (status === 'loading') {
    return (
      <h2>
        Loading or not authenticated... <br />
      </h2>
    )
  } else if (status === 'authenticated') {
    return (
      <>
        <h2>Hello , you are signed in</h2>
      </>
    )
  }
  return (
    <h2>
      Not signed in <br />
    </h2>
  )
}
