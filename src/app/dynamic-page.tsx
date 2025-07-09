'use client'

// 'use client' so we generate a new code on every page load

import { useRouter } from 'next/navigation'
import { parseAsInteger, useQueryState } from 'nuqs'
import { useCallback } from 'react'
import { toast } from 'sonner'
import { Divider } from '@/components/Divider'
import { Link } from '@/components/Link'
import { generateCode } from '@/lib/generateCode'
import { cn } from '@/lib/utils'

function ClickableCode({ children, className, ...props }: React.ComponentProps<'button'>) {
  return (
    <button
      {...props}
      className={cn(
        'block w-auto cursor-copy whitespace-pre-wrap text-start font-mono hover:opacity-60',
        className
      )}
      type="button"
    >
      <code>{children}</code>
    </button>
  )
}

export default function Home() {
  const [codeLength, setCodeLength] = useQueryState('l', parseAsInteger.withDefault(8))
  const errorCode = generateCode(codeLength)
  const lastRefresh = new Date()
  const router = useRouter()

  const handleCopy = useCallback(
    (text: string) => {
      // copy code to the clipboard
      navigator.clipboard.writeText(text)
      toast('🎉 Copied to clipboard')

      router.refresh()
    },
    [router]
  )

  const prefixes = ['ERROR', 'INFO', 'WARN', 'LOG']
  const longestPrefixLength = Math.max(...prefixes.map((p) => p.length))

  return (
    <main className="mx-auto mb-48 w-[600px] max-w-full space-y-8 p-4 text-2xl lg:py-8">
      <h1 className="font-bold text-5xl">Get Your Error Code</h1>
      <p>
        Generate error codes for your projects to find logs faster.
        <br />A new code is generated after each copy.
      </p>
      <p>
        The code is generated with{' '}
        <Link
          className="underline"
          href="https://zelark.github.io/nano-id-cc/"
          rel="noopener noreferrer"
          target="_blank"
        >
          nanoid
        </Link>
        .
      </p>

      <label>
        Code Length:{' '}
        <input
          className="border bg-transparent p-1"
          defaultValue={codeLength}
          max={20}
          min={1}
          onChange={(e) => {
            const newNumber = Number(e.target.value)
            if (newNumber < 1) {
              setCodeLength(1)
            } else if (newNumber > 20) {
              setCodeLength(20)
            } else {
              setCodeLength(newNumber)
            }
          }}
          type="number"
        />
      </label>

      <Divider />

      <ClickableCode onClick={() => handleCopy(errorCode)}>
        {''.padStart(longestPrefixLength, ' ')} {errorCode}
      </ClickableCode>

      {prefixes.map((prefix) => (
        <ClickableCode
          className=""
          key={prefix}
          onClick={() => handleCopy(`${prefix}_${errorCode}`)}
        >
          {prefix.padStart(longestPrefixLength, ' ')}_{errorCode}
        </ClickableCode>
      ))}

      <Divider />

      {prefixes.map((prefix) => {
        const isError = prefix === 'ERROR'

        const codeSnippet = `console.${prefix.toLowerCase()}('${prefix}_${errorCode}', ${
          isError ? 'error' : 'data'
        })`
        return (
          <ClickableCode className="break-all" key={prefix} onClick={() => handleCopy(codeSnippet)}>
            {codeSnippet}
          </ClickableCode>
        )
      })}

      <Divider />

      <div>Last Refreshed: {lastRefresh ? lastRefresh.toLocaleString() : 'Loading…'}</div>
    </main>
  )
}
