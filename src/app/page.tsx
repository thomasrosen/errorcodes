'use client'
// 'use client' so we generate a new code on every page load

import { useCallback, useState } from 'react'
import { toast } from 'sonner'
import { formatNiceIsoDate } from '@/lib/formatNiceIsoDate'
import { generateCode } from '@/lib/generateCode'

export default function Home() {
  const [codeLength, setCodeLength] = useState(8)
  const [errorCode, setErrorCode] = useState(generateCode(codeLength))
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date())

  const reloadErrorCode = useCallback(() => {
    setErrorCode(generateCode(codeLength))
    setLastRefresh(new Date())
  }, [codeLength])

  const handleCopy = (text: string) => {
    // copy code to the clipboard
    navigator.clipboard.writeText(text)
    toast('🎉 Copied 2 Clipboard')

    // generate a new code after copy
    reloadErrorCode()
  }

  const prefixes = ['ERROR', 'INFO', 'WARN', 'LOG']

  return (
    <main className="mx-auto w-[600px] max-w-full p-4 text-2xl lg:py-10">
      <h1 className="mb-8 font-bold text-5xl">Get Your Error Code</h1>
      <p>A new code is generated after each copy.</p>

      <hr className="my-8" />

      <button
        className="mb-8 cursor-copy whitespace-normal font-mono"
        onClick={() => handleCopy(errorCode)}
        type="button"
      >
        <code>{errorCode}</code>
      </button>

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

      <hr className="my-8" />

      <div className="flex flex-col gap-8">
        {prefixes.map((prefix) => (
          <button
            className="cursor-copy whitespace-normal font-mono"
            key={prefix}
            onClick={() => handleCopy(`${prefix}_${errorCode}`)}
            type="button"
          >
            <code>
              {prefix}_{errorCode}
            </code>
          </button>
        ))}
      </div>

      <hr className="my-8" />

      <div className="flex flex-col gap-8">
        {prefixes.map((prefix) => {
          const isError = prefix === 'ERROR'

          return (
            <button
              className="cursor-copy whitespace-normal font-mono"
              key={prefix}
              onClick={() =>
                handleCopy(
                  `console.${prefix.toLowerCase()}('${prefix}_${errorCode}', ${
                    isError ? 'error' : 'data'
                  })`
                )
              }
              type="button"
            >
              <code>
                console.{prefix.toLowerCase()}(&apos;{prefix}_{errorCode}&apos;,
                {isError ? 'error' : 'data'})
              </code>
            </button>
          )
        })}
      </div>

      <hr className="my-8" />

      <pre className="whitespace-normal">Last Refreshed: {formatNiceIsoDate(lastRefresh)}</pre>
    </main>
  )
}
