'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Session } from '@supabase/supabase-js'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export function RecipeCreator () {
  const supabase = createClientComponentClient()
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    (async () => {
      const {
        data: { session }
      } = await supabase.auth.getSession()

      if (session) setSession(session)
    })()
  }, [])

  return (
    <>
      {
        session &&
          <Link href='/create-recipe' className='underline-offset-4 hover:underline'>Create Recipe</Link>
      }
    </>
  )
}
