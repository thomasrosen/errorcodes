import type { Metadata } from 'next'
import { Toaster } from '@/components/ui/sonner'
import '@/styles/index.css'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import '@fontsource-variable/petrona'
import '@fontsource/fira-code'

export const metadata: Metadata = {
  title: 'Error Codes',
  description: 'Generate error codes for your projects to find logs faster.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <NuqsAdapter>{children}</NuqsAdapter>
        <Toaster />
      </body>
    </html>
  )
}
