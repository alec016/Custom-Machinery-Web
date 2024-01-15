import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function CreateRecipePage () {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (!session) return redirect('/login')

  return (
    <main className='h-[80vh] w-full'>
      <ul className='grid grid-cols-1 place-items-center gap-10 h-full w-full place-content-center'>
        <li>
          <Link href='/create-recipe/1.16' className='underline-offset-4 hover:underline'>Create Recipe for 1.16</Link>
        </li>
        <li>
          <Link href='/create-recipe/1.18' className='underline-offset-4 hover:underline'>Create Recipe for 1.18</Link>
        </li>
        <li>
          <Link href='/create-recipe/1.19' className='underline-offset-4 hover:underline'>Create Recipe for 1.19</Link>
        </li>
      </ul>
    </main>
  )
}
