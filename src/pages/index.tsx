import React, { ReactElement, useMemo, useEffect } from 'react'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import 'twin.macro'

import Layout from '../components/Layout'
import Metatag from '~/components/Metatag'
import Share from '~/components/Share'
import { ITestResult } from '~/types/data'
import { FB_APP_ID, KAKAO_KEY } from '~/constants'
import { MAIN_IMG_CDN } from '~/constants'

function Home() {
  const { t } = useTranslation()
  const pageUrl = useMemo(() => `https://bunny-mbti.vercel.app.vercel.app/`, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    initKakaoSdk()
  }, [])

  const initKakaoSdk = () => {
    const { Kakao } = window
    if (!Kakao.isInitialized()) Kakao.init(KAKAO_KEY)
  }

  return (
    <>
      <Metatag />
      <main tw="space-y-5">
        <img src={MAIN_IMG_CDN} alt="미리보기" />

        <p tw="text-sm text-lg px-2 text-center whitespace-pre-line">
          {t('intro:intro-1')}
          <span tw="text-pink-500 font-bold text-xl">{t('intro:intro-kpop')}</span>
          {t('intro:intro-2')}
          <span tw="text-pink-500 font-bold"> {t('intro:intro-start')}</span>
          {t('intro:intro-3')}
        </p>
        <div tw="px-3">
          <Link href="/test">
            <button type="button" tw="py-4 w-full bg-gray-500 rounded text-pink-300 text-2xl">
              {t('intro:start-button')}
            </button>
          </Link>
        </div>
        <Share
          pageUrl={pageUrl}
          result={{ name: t(`intro:share`),
                    desc: "",
                    partner: "",
                    id: 0,
                    og: ""}}
          title={t('intro:share')}
          clipboard={t('intro:clipboard')}
        />
      </main>
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async ({ locale = 'ko' }) => {
  return { props: { ...(await serverSideTranslations(locale, ['intro'])) } }
}
Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
