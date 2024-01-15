import type { Metadata } from 'next'
import './globals.css'
import { ReactNode } from 'react'
import { Providers, Navbar, Footer } from 'components'

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  theme: 'dark'
}

export const metadata: Metadata = {
  title: 'Custom Machinery Model Creator',
  description: 'Generate machine models with visual things',
  icons: {
    icon: 'favicon.ico'
  }
}

export default function RootLayout ({ children }: { children: ReactNode }) {
  return (
    <html lang='en' className='dark'>
      <body>
        <Navbar />
        <Providers>
          {children}
        </Providers>
        <Footer />
      </body>
    </html>
  )
}
