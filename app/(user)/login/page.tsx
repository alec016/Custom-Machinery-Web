'use client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AuthForm () {
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    (async () => {
      const {
        data: { session }
      } = await supabase.auth.getSession()

      if (session) router.push('/account')
    })()
  })

  return (
    <main className='grid place-content-center min-h-[75vh]'>
      <Auth
        supabaseClient={supabase}
        view='sign_in'
        appearance={{ theme: ThemeSupa }}
        theme='dark'
        showLinks={false}
        magicLink={false}
        providers={['discord']}
        dark
        redirectTo='http://localhost:3000/auth/callback'
        onlyThirdPartyProviders
      />
    </main>
  )
}
