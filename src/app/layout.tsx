import Navbar from '@/components/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import Footer from '@/components/Footer'


export const metadata: Metadata = {
  title: 'Home - Projects',
  description: 'Showcase and develop remarkable projects',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <header>
         <Navbar />
        </header>
        {children}
        <footer> 
          <Footer />
        </footer>
        </body>
    </html>
  )
}
