import React from 'react'
import 'twin.macro'

function Header() {
  return (
    <header tw={'p-3 flex items-center justify-center border-b [height:60px]'}>
      <h1 tw="text-xl text-gray-500">버니 MBTI를 찾아서!</h1>
    </header>
  )
}

export default Header
