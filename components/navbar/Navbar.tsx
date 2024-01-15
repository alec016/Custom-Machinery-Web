import Link from 'next/link'
import { Log } from './Log'
import { ModelCreator } from './model-creator'
import { RecipeCreator } from './recipe-creator'

export function Navbar () {
  return (
    <nav className='sticky top-0 left-0 w-full flex justify-between px-10 py-5 bg-slate-800 items-center z-20'>
      <div className='flex gap-5 items-center'>
        <img src='/assets/img/custom_machinery.png' alt='Custom Machinery logo' className='aspect-square w-8' />
        <Link href='/' className='underline-offset-4 hover:underline'>Custom Machinery Model Creator</Link>
      </div>
      <div className='flex gap-5'>
        <Link href='/' className='underline-offset-4 hover:underline'>
          Home
        </Link>
        <Link href='/account' className='underline-offset-4 hover:underline'>
          Account
        </Link>
        <ModelCreator />
        <RecipeCreator />
        <Log />
      </div>
    </nav>
  )
}
