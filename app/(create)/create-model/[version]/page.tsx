import { redirect } from 'next/navigation'
import { V116 } from './1.16'
import { V118 } from './1.18'
import { V119 } from './1.19'

export default function Versioning ({ params: { version } }: { params: { version: '1.16' | '1.18' | '1.19' }, searchParams: { [x: string]: string } }) {
  switch (version) {
    case '1.16': return <V116 params={{ version }} />
    case '1.18': return <V118 params={{ version }} />
    case '1.19': return <V119 params={{ version }} />
    default: return redirect('/create-model')
  }
}
