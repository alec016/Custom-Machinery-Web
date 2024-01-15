import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { ArrowBackIos } from '@mui/icons-material'

export default async function Versioning ({ params: { type, version } }: { params: { version: '1.16' | '1.18' | '1.19', type: 'json' | 'kubejs' | 'zenscript' }, searchParams: { [x: string]: string } }) {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session }
  } = await supabase.auth.getSession()

  return (
    <main className='p-6'>
      <Link href={`/create-recipe/${version}`} className='underline-offset-4 hover:underline flex items-center'><ArrowBackIos />Back</Link>
      {/* <ModelForm params={{ version, type }} session={session} /> */}
    </main>
  )
}
