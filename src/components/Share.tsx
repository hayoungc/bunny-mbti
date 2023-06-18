import { styled } from 'twin.macro'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { ITestResult } from '~/types/data'
interface ShareProps {
  title: string
  clipboard: string
  result: ITestResult
  pageUrl: string
}
function Share({ title, clipboard, result, pageUrl }: ShareProps) {
  const { name, og: thum } = result
  const shareToKaKao = () => {
    const { Kakao } = window
    Kakao.Share.sendCustom({
      templateId: 95065,
      templateArgs: { NAME: name, THUM: thum },
    })
  }

  const shareToFacebook = () => {
    const { FB } = window
    FB.ui(
      {
        display: 'popup',
        method: 'share',
        href: pageUrl,
      },
      function (response: any) {}
    )
  }

  const shareToLink = () => {
    alert(clipboard)
  }

  return (
    <div tw="px-3 py-1">
      <p tw="text-lg text-center text-gray-500">{title}</p>
      <div tw="flex space-x-2 justify-center">
        <CopyToClipboard tw="w-10 h-10" text={pageUrl}>
          <DefaultLinkButton onClick={shareToLink} aria-label="클립보드복사" />
        </CopyToClipboard>

        <KakaoLinkButton tw="w-10 h-10" onClick={shareToKaKao} id="kakao-link-btn" aria-label="카카오톡으로공유" />
      </div>
      <div tw="text-center">
        https://github.com/hayoungc
      </div>
    </div>
  )
}

export default Share

const KakaoLinkButton = styled.button`
  background: url('/images/share/kakao.png');
  background-size: cover;
  width: 32px;
  height: 32px;
  cursor: pointer;
`
const FaceBookLinkButton = styled.button`
  background: url('/images/share/facebook.png');
  background-size: cover;
  width: 32px;
  height: 32px;
  cursor: pointer;
`
const TwitterLinkButton = styled.button`
  background: url('/images/share/twitter.png');
  background-size: cover;
  width: 32px;
  height: 32px;
  cursor: pointer;
`
const DefaultLinkButton = styled.button`
  background: #eee url('/images/share/link.png');
  border-radius: 3px;
  background-size: cover;
  width: 32px;
  height: 32px;
  cursor: pointer;
`
