// import { signIn } from 'next-auth/react'
// import React from 'react'

// function login() {
//   return (
//     <div>
//       <h1>Login</h1>
//       <p>
//         <button onClick={() => signIn('github', { callbackUrl: 'http://localhost:3000' })}>Sign in (redirect)</button>
//       </p>
//     </div>
//   )
// }

// export default login

import React from 'react'
import { getProviders, signIn } from 'next-auth/react'

export async function getServerSideProps(context) {
  const providers = await getProviders()
  return {
    props: { providers }
  }
}

export default function login({ providers }) {
  console.log('providers', providers)
  return (
    <>
      {Object.values(providers).map(provider => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id, { callbackUrl: 'http://localhost:3000' })}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
  )
}
