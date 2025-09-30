import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import localFont from 'next/font/local'

const zedSans = localFont({
  src: [
    // Prefer WOFF2 for performance
    { path: '../public/fonts/zed/zed-sans-extended.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/zed/zed-sans-extendeditalic.woff2', weight: '400', style: 'italic' },
    { path: '../public/fonts/zed/zed-sans-extendedbold.woff2', weight: '700', style: 'normal' },
    { path: '../public/fonts/zed/zed-sans-extendedbolditalic.woff2', weight: '700', style: 'italic' },
    // Fallback TTFs
    { path: '../public/fonts/zed/zed-sans-extended.ttf', weight: '400', style: 'normal' },
    { path: '../public/fonts/zed/zed-sans-extendeditalic.ttf', weight: '400', style: 'italic' },
    { path: '../public/fonts/zed/zed-sans-extendedbold.ttf', weight: '700', style: 'normal' },
    { path: '../public/fonts/zed/zed-sans-extendedbolditalic.ttf', weight: '700', style: 'italic' },
  ],
  display: 'swap',
  variable: '--font-zed-sans',
  preload: true,
})

const zedMono = localFont({
  src: [
    // Prefer WOFF2 for performance (mono is optional; not preloaded by default)
    { path: '../public/fonts/zed/zed-mono-extended.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/zed/zed-mono-extendeditalic.woff2', weight: '400', style: 'italic' },
    { path: '../public/fonts/zed/zed-mono-extendedbold.woff2', weight: '700', style: 'normal' },
    { path: '../public/fonts/zed/zed-mono-extendedbolditalic.woff2', weight: '700', style: 'italic' },
    // Fallback TTFs
    { path: '../public/fonts/zed/zed-mono-extended.ttf', weight: '400', style: 'normal' },
    { path: '../public/fonts/zed/zed-mono-extendeditalic.ttf', weight: '400', style: 'italic' },
    { path: '../public/fonts/zed/zed-mono-extendedbold.ttf', weight: '700', style: 'normal' },
    { path: '../public/fonts/zed/zed-mono-extendedbolditalic.ttf', weight: '700', style: 'italic' },
  ],
  display: 'swap',
  variable: '--font-zed-mono',
  preload: false,
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${zedSans.variable} ${zedMono.variable} font-sans`}>
      <Component {...pageProps} />
    </div>
  )
}
