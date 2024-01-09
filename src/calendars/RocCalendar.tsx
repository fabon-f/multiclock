import { Text } from '@kuma-ui/core'
import { padNum } from '../utils'
import { Temporal } from 'temporal-polyfill'

interface Props {
  date: Temporal.ZonedDateTime
}

function convert(date: Temporal.ZonedDateTime) {
  const year = date.year - 1911
  return `民國${year}年${date.month}月${date.day}日 ${date.hour}:${padNum(
    date.minute,
    2,
  )}:${padNum(date.second, 2)}`
}

export default function RocCalendar({ date }: Props) {
  return (
    <Text as="div" fontSize={24} fontWeight="bold" lang="zh-Hant-TW">
      {convert(date)}
    </Text>
  )
}
