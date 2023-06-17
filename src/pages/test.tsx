import React, { ReactElement, useLayoutEffect, useMemo, useState } from 'react'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import 'twin.macro'

import Option from '~/components/Option'
import Layout from '~/components/Layout'
import Metatag from '~/components/Metatag'
import ProgressBar from '~/components/ProgressBar'

import { IQnA } from '~/types/data'

interface TestProps {
  qna: IQnA[]
}
function Test({ qna }: TestProps) {
  const router = useRouter()
  const { t } = useTranslation()

  const [step, setStep] = useState<number>(0)
  const [finish, setFinish] = useState(false)
  const [type, setType] = useState<{ [key: string]: number }>({
    E: 0,
    N: 0,
    T: 0,
    J: 0,
  })
  const currentData = useMemo<IQnA>(() => qna[step], [step])
  useLayoutEffect(() => {
    if (!finish) return

    const res = calculateResult()
    router.push(`/result/${res}`)
  }, [finish])

  function calculateResult() {
    let res = ''
    res += type.E > 0 ? 'E' : 'I'
    res += type.N > 0 ? 'N' : 'S'
    res += type.T > 0 ? 'T' : 'F'
    res += type.J > 0 ? 'J' : 'P'

    switch (res) {
      case 'ISTP':
        res = '1'
        break
      case 'INTP':
        res = '2'
        break
      case 'ESFJ':
        res = '3'
        break
      case 'ENFJ':
        res = '4'
        break
      case 'ISFP':
        res = '5'
        break
      case 'INFP':
        res = '6'
        break
      case 'ENFP':
        res = '7'
        break
      case 'ENTP':
        res = '8'
        break
      case 'ISTJ':
        res = '9'
        break
      case 'INTJ':
        res = '10'
        break
      case 'ESTP':
        res = '11'
        break
      case 'ESFP':
        res = '12'
        break
      case 'ISFJ':
        res = '13'
        break
      case 'INFJ':
        res = '14'
        break
      case 'ESTJ':
        res = '15'
        break
      case 'ENTJ':
        res = '16'
        break
      default:
        throw new Error('잘못된 타입입니다')
    }
    return res
  }

  if (!currentData) return null
  return (
    <>
      <Metatag />
      <section tw="px-4">
        <ProgressBar step={step} />

        <article tw="p-5 text-center text-xl text-pink-500 height[120px]">
          <p>{t(`qna:${currentData.question}`)}</p>
        </article>

        <article tw="px-5 pb-5 text-center">
          <img tw="w-60 h-60 rounded-full shadow inline" src={`/images/${step+1}.png`}></img>
        </article>

        <article tw="text-center space-y-4">
          {currentData.options.map((answer, i) => {
            return (
            <Option
            option={t(`qna:${answer.answer}`)}
                key={i}
                onClick={() => {
                  const [key, value] = Object.entries(answer.type)[0]
                  setType({
                    ...type,
                    [key]: type[key] + value,
                  })
                  if (step !== 11) setStep((_step) => _step + 1)
                  else setFinish(true)
                }}
              />
            )
          })}
        </article>
      </section>
    </>
  )
}

export default Test
Test.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export const getStaticProps: GetStaticProps = async ({ locale = 'ko' }) => {
  const { data } = await import(`~/data/qna.json`)

  return { props: { qna: data, ...(await serverSideTranslations(locale, ['qna'])) } }
}
