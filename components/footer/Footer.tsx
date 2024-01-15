'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export function Footer () {
  const [height, setHeight] = useState(0)
  const [clientHeight, setCLientHeight] = useState(0)

  useEffect(() => {
    setCLientHeight(document.documentElement.clientHeight)
    setHeight(Array.from(document.body.children).reduce<number>((prev, curr) => {
      if (curr.tagName === 'footer') return prev
      return prev + curr.clientHeight
    }, 0))
  }, [])

  return (
    <footer
      className={`${height < clientHeight
        ? 'fixed'
        : ''} w-full bg-slate-800 bottom-0 left-0 px-10 py-5 grid grid-cols-3 z-10`}
    >
      <Link
        href='/'
        className='underline-offset-4 hover:underline flex gap-2 items-center'
      >
        <img src='/assets/img/custom_machinery.png' alt='Custom machinery Logo' className='aspect-square w-5' />
        {new Date().getFullYear()}{' '}&copy;{' '}Custom Machinery
      </Link>
      <div className='grid grid-cols-3 col-span-2 gap-3'>
        <Link
          href='https://frinn.gitbook.io/custom-machinery-1.19/'
          className='underline-offset-4 hover:underline flex gap-2 items-center w-max'
          target='_blank'
          rel='noreferrer'
        >
          <img src='/assets/img/custom_machinery.png' alt='Custom machinery Logo' className='aspect-square w-5' />
          Custom Machinery 1.19 - Wiki
        </Link>
        <Link
          href='https://frinn.gitbook.io/custom-machinery-1.18/'
          className='underline-offset-4 hover:underline flex gap-2 items-center w-max'
          target='_blank'
          rel='noreferrer'
        >
          <img src='/assets/img/custom_machinery.png' alt='Custom machinery Logo' className='aspect-square w-5' />
          Custom Machinery 1.18 - Wiki
        </Link>
        <Link
          href='https://frinn.gitbook.io/custom-machinery-1.16/'
          className='underline-offset-4 hover:underline flex gap-2 items-center w-max'
          target='_blank'
          rel='noreferrer'
        >
          <img src='/assets/img/custom_machinery.png' alt='Custom machinery Logo' className='aspect-square w-5' />
          Custom Machinery 1.16 - Wiki
        </Link>
        <Link
          href='https://discord.gg/sx7RtY4KDV'
          className='underline-offset-4 hover:underline flex gap-2 items-center w-max'
          target='_blank'
          rel='noreferrer'
        >
          <img src='/assets/svg/discord.svg' alt='discord logo' className='aspect-square w-5' />
          Custom Machinery Discord
        </Link>
      </div>
    </footer>
  )
}
