import React from 'react'
import Head from 'next/head'

interface MetatagProps {
  title?: string
  description?: string
  image?: string
}

function Metatag({
  title = 'My bunny type test',
  description = '나는 어떤 유형의 버니일까?',
  image = 'https://rawcdn.githack.com/borachoidev/My-Idol-Type/9db39f52240ecc175551323967d908cdc78fd6f0/public/images/5.jpg?raw=true',
}: MetatagProps) {
  return (
    <Head>
      <title>{title} | MBTI 테스트 </title>
      <meta name="description" content={description} />
      <meta name="keywords" content="mbti,MBTITest,mbti테스트" />
      <meta property="og:title" content={title + '| My Bunny Type Test'} />
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="My Bunny Type Test" />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:card" content="photo" />
    </Head>
  )
}

export default Metatag
