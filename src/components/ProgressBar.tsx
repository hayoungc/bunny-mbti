import 'twin.macro'
interface ProgressBarProps {
  step: number
}

function ProgressBar({ step }: ProgressBarProps) {
  return (
    <header>
      <span tw="text-lg">{step + 1}/12</span>
      <div tw="bg-gray-100 rounded-full overflow-hidden [height:16px]">
        <div style={{ width: `${(step+1) * 8.333}%` }} tw="bg-pink-200 transition-all">
          &nbsp;
        </div>
      </div>
    </header>
  )
}
export default ProgressBar
