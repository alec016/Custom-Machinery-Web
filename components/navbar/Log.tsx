'use client'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export function Log () {
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
        !session &&
          <Link href='/login' className='underline-offset-4 hover:underline'>
            Sign In
          </Link>
      }
      {
        session &&
          <form action='/auth/signout' method='post'>
            <button
              className='underline-offset-4 hover:underline'
              type='submit'
            >
              Sign out
            </button>
          </form>
      }
    </>
  )
}
