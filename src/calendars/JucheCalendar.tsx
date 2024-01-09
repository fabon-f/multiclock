import { Text } from '@kuma-ui/core'
import { padNum } from '../utils'

interface Props {
  date: Date
}

function convert(date: Date) {
  const year = date.getFullYear() - 1911
  return `주체${year}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${padNum(
    date.getHours(),
    2,
  )}:${padNum(date.getMinutes(), 2)}:${padNum(date.getSeconds(), 2)}`
}

export default function JucheCalendar({ date }: Props) {
  return (
    <div>
      <Text as="div" fontSize={24} fontWeight="bold" lang="ko-KP">
        {convert(date)}
      </Text>
    </div>
  )
}
