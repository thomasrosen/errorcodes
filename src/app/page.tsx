'use client';

import { customAlphabet } from 'nanoid';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function Home() {
  const [codeLength, setCodeLength] = useState(8);
  const [errorCode, setErrorCode] = useState('');
  const [lastRefresh, setLastRefresh] = useState<Date>();

  const reloadErrorCode = useCallback(() => {
    const alphabet =
      '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const nanoid = customAlphabet(alphabet, codeLength);

    const new_error_code = nanoid();
    setErrorCode(new_error_code);
    setLastRefresh(new Date());
  }, [codeLength]);

  useEffect(() => {
    reloadErrorCode();
  }, [reloadErrorCode]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast('🎉 Copied 2 Clipboard');
    reloadErrorCode();
  };

  const prefixes = ['ERROR', 'INFO', 'WARN', 'LOG'];

  return (
    <main className="mx-auto w-[600px] max-w-full p-4 text-2xl lg:py-10">
      <h1 className="mb-8 font-bold text-5xl">Get Your Error Code</h1>
      <p>A new code is generated after each copy.</p>

      <hr className="my-8" />

      <pre
        className="mb-8 cursor-copy whitespace-normal"
        onClick={() => handleCopy(errorCode)}
      >
        <code>{errorCode}</code>
      </pre>

      <label>
        Code Length:{' '}
        <input
          className="border bg-transparent p-1"
          type="number"
          defaultValue={codeLength}
          min={1}
          max={20}
          onChange={(e) => {
            const newNumber = Number(e.target.value);
            if (newNumber < 1) {
              setCodeLength(1);
            } else if (newNumber > 20) {
              setCodeLength(20);
            } else {
              setCodeLength(newNumber);
            }
          }}
        />
      </label>

      <hr className="my-8" />

      <div className="flex flex-col gap-8">
        {prefixes.map((prefix) => (
          <pre
            key={prefix}
            className="cursor-copy whitespace-normal"
            onClick={() => handleCopy(`${prefix}_${errorCode}`)}
          >
            <code>
              {prefix}_{errorCode}
            </code>
          </pre>
        ))}
      </div>

      <hr className="my-8" />

      <div className="flex flex-col gap-8">
        {prefixes.map((prefix) => {
          const isError = prefix === 'ERROR';

          return (
            <pre
              key={prefix}
              className="cursor-copy whitespace-normal"
              onClick={() =>
                handleCopy(
                  `console.${prefix.toLowerCase()}('${prefix}_${errorCode}', ${
                    isError ? 'error' : 'data'
                  })`
                )
              }
            >
              <code>
                console.{prefix.toLowerCase()}(&apos;{prefix}_{errorCode}&apos;,
                {isError ? 'error' : 'data'})
              </code>
            </pre>
          );
        })}
      </div>

      <hr className="my-8" />

      <pre className="whitespace-normal">
        Last Refreshed:{' '}
        {lastRefresh?.toISOString().replace(/T/, ' ').replace(/\..+/, '')}
      </pre>
    </main>
  );
}
