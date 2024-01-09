import { Text } from '@kuma-ui/core'
import { padNum } from '../utils'
import { Temporal } from 'temporal-polyfill'

interface Props {
  date: Temporal.ZonedDateTime
}

function convert(date: Temporal.ZonedDateTime) {
  const year = date.year - 1911
  return `주체${year}년 ${date.month}월 ${date.day}일 ${padNum(
    date.hour,
    2,
  )}:${padNum(date.minute, 2)}:${padNum(date.second, 2)}`
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
