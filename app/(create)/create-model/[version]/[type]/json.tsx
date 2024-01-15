import { ArrowBackIos } from '@mui/icons-material'
import Link from 'next/link'
import { ModelForm } from 'components'
import { Session } from '@supabase/auth-helpers-nextjs'

export function JSON ({ params: { version, type = 'json', session } }: { params: { version: '1.16' | '1.18' | '1.19', type?: 'json' | 'kubejs' | 'zenscript', session: Session | null } }) {
  return (
    <main className='p-6'>
      <Link href={`/create-model/${version}`} className='underline-offset-4 hover:underline flex items-center'><ArrowBackIos />Back</Link>
      <ModelForm params={{ version, type }} session={session} />
    </main>
  )
}
