const isoDateRegexT = /T/
const isoDateRegexMilliseconds = /\..+/

export function formatNiceIsoDate(date: Date) {
  return date
    .toISOString()
    .replace(isoDateRegexT, ' ') // replace T with a space
    .replace(isoDateRegexMilliseconds, '') // remove milliseconds
}
