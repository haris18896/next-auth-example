import { useSession } from 'next-auth/react'

export default function AdminDashboard() {
  const { data: session } = useSession()

  return 'some super secret data on dashboard'
}

// AdminDashboard.auth = true // it can be easily modified to support something like an option object for role based access on pages

AdminDashboard.auth = {
  role: 'admin',
  loading: 'loading skeleton...',
  unauthorized: '/login-with-different-user' // redirect to this url
}
