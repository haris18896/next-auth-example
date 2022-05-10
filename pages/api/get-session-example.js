import { getSession } from 'next-auth/react'

export default async (req, res) => {
  const session = await getSession({ req })
  if (session) {
    // Signed in
    console.log('Session', JSON.stringify(session, null, 2))
    res.send({
      content: 'This is protected content. You can access this content because you are signed in.'
    })
  } else {
    // Not Signed in
    res.status(401)
  }
  res.end()
}
