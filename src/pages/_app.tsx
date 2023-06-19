import { ReactElement, ReactNode, useEffect } from 'react'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { GlobalStyles, styled } from 'twin.macro'
import { appWithTranslation } from 'next-i18next'
import Script from 'next/script'
import { GA_TRACKING_ID } from '~/constants'
import * as gtag from "../lib/gtag"

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

declare global {
  interface Window {
    Kakao: any
    fbAsyncInit: any
    FB: any
    gtag: any
  }
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
    <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
    <Script
      id='google-analytics'
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', ${GA_TRACKING_ID}, {
            page_path: window.location.pathname,
          });
        `,
        }}
      />
    <div tw="bg-black">
      <RootContainer>{getLayout(<Component {...pageProps} />)}</RootContainer>
      <GlobalStyles />
    </div>
    </>
  )
}
const RootContainer = styled.div`
  position: relative;
  min-width: 320px;
  min-height: 100vh;
  margin: 0 auto;
  background-color: #ffffff;
  font-family: 'M PLUS Rounded 1c', 'Jua', sans-serif;
`

export default appWithTranslation(MyApp)
