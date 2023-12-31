import React, { ReactElement } from 'react'
import Link from 'next/link'
import 'twin.macro'

import Layout from '~/components/Layout'
import Metatag from '~/components/Metatag'
import { GetStaticProps } from 'next'
import { ITestResult } from '~/types/data'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

interface TypesProps {
  testResult: ITestResult[]
}
function Types({ testResult }: TypesProps) {
  const { t } = useTranslation()
  return (
    <>
      <Metatag title={t('result:all-type')} />
      <section tw="space-y-8 text-center">
        <h1 tw="text-xl pt-5 text-pink-500">{t('result:all-type')}</h1>
        {testResult.map((result) => (
          <React.Fragment key={result.id}>
            <Link href={`/result/${result.id}`}>
              <article tw="cursor-pointer space-y-2 opacity-50 hover:opacity-100 ">
                <div>
                  <img
                    src={`/images/${result.id}.png`}
                    //src={result.og}
                    alt={result.name}
                    tw="rounded-full shadow inline h-60 w-48"
                  />
                </div>
                <p tw="text-gray-500 ">{t(`result:${result.name}`)}</p>
              </article>
            </Link>
          </React.Fragment>
        ))}
        <div tw="p-3">
          <Link href="/test">
            <button type="button" tw="py-4 w-full rounded bg-gray-500 text-pink-300">
              {t('result:find-my-type')}
            </button>
          </Link>
        </div>
      </section>
    </>
  )
}

export default Types

Types.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
export const getStaticProps: GetStaticProps = async ({ locale = 'ko' }) => {
  const response = await import('~/data/result.json')
  const testResult: ITestResult[] = response.data
  return {
    props: { testResult, ...(await serverSideTranslations(locale, ['result'])) },
  }
}
