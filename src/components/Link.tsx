import NextLink from 'next/link'

export function Link({ children, ...props }: React.ComponentProps<typeof NextLink>) {
  return (
    <NextLink
      {...props}
      className="underline decoration-from-font underline-offset-2 hover:opacity-60"
    >
      {children}
    </NextLink>
  )
}
