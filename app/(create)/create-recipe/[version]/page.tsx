import Link from 'next/link'
import { ArrowBackIos } from '@mui/icons-material'

export default function Versioning ({ params: { version } }: { params: { version: '1.16' | '1.18' | '1.19' }, searchParams: { [x: string]: string } }) {
  return (
    <main className='p-6'>
      <Link href='/create-recipe' className='underline-offset-4 hover:underline flex items-center'><ArrowBackIos />Back</Link>
      <div>
        <ul>
          <li>
            <Link href={`/create-recipe/${version}/json`} className='underline-offset-4 hover:underline flex items-center'>JSON</Link>
          </li>
          <li>
            <Link href={`/create-recipe/${version}/kubejs`} className='underline-offset-4 hover:underline flex items-center'>KubeJS</Link>
          </li>
          <li>
            <Link href={`/create-recipe/${version}/zenscript`} className='underline-offset-4 hover:underline flex items-center'>Zenscript</Link>
          </li>
        </ul>
      </div>
    </main>
  )
}
