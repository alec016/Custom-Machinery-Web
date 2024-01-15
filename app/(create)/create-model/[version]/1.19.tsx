import Link from 'next/link'
import { ArrowBackIos } from '@mui/icons-material'

export function V119 ({ params: { version } }: { params: { version: '1.16' | '1.18' | '1.19' } }) {
  return (
    <main className='p-6'>
      <Link href='/create-model' className='underline-offset-4 hover:underline flex items-center'><ArrowBackIos />Back</Link>
      <div>
        <ul>
          <li>
            <Link href={`/create-model/${version}/json`} className='underline-offset-4 hover:underline flex items-center'>JSON</Link>
          </li>
          <li>
            <Link href={`/create-model/${version}/kubejs`} className='underline-offset-4 hover:underline flex items-center'>KubeJS</Link>
          </li>
          <li>
            <Link href={`/create-model/${version}/zenscript`} className='underline-offset-4 hover:underline flex items-center'>Zenscript</Link>
          </li>
        </ul>
      </div>
    </main>
  )
}
