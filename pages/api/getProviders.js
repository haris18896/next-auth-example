import { getProviders } from 'next-auth/react'

export default async (req, res) => {
  const providers = await getProviders({ req })
  res.send(providers)
  res.end()
}
