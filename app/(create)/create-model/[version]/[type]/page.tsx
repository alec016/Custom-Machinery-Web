/* eslint-disable react/jsx-pascal-case */
import { redirect } from 'next/navigation'
import { JSON } from './json'
import { KubeJS } from './kubejs'
import { Zenscript } from './zenscript'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export default async function Versioning ({ params: { type, version } }: { params: { version: '1.16' | '1.18' | '1.19', type: 'json' | 'kubejs' | 'zenscript' }, searchParams: { [x: string]: string } }) {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session }
  } = await supabase.auth.getSession()

  switch (type) {
    case 'json': return <JSON params={{ version, type, session }} />
    case 'kubejs': return <KubeJS params={{ version, type, session }} />
    case 'zenscript': return <Zenscript params={{ version, type, session }} />
    default: return redirect(`/create-model/${version}`)
  }
}
