"use client"
import './globals.css'
import { Inter } from 'next/font/google'
import { NextUIProvider } from '@nextui-org/react';
import { Providers } from '@/store/providers'
import Navsbar from "@/component/Navsbar";


const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <NextUIProvider>
            <Navsbar/>
              {children}
          </NextUIProvider>
        </Providers>
      </body>
    </html>
  )
}
