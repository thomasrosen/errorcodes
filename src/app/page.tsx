'use client'

import dynamic from 'next/dynamic'

const App = dynamic(() => import('./dynamic-page'), { ssr: false })
export default App
