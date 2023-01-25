import Script from 'next/script'

export default function Head() {
  return (
    <>
      <title>Kev Zettler</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link rel="icon" href="/favicon.ico" />
      <Script src="/js/vendor/modernizr-2.5.3.min.js" />
    </>
  )
}
