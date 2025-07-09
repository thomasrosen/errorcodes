import { customAlphabet } from 'nanoid'

export function generateCode(codeLength: number) {
  const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  const nanoid = customAlphabet(alphabet, codeLength)

  const new_error_code = nanoid()

  console.log(new_error_code)

  return new_error_code
}
