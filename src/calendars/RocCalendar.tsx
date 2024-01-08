import { Text } from '@kuma-ui/core'
import { padNum } from '../utils'

interface Props {
  date: Date
}

function convert(date: Date) {
  const year = date.getFullYear() - 1911
  return `民國${year}年${
    date.getMonth() + 1
  }月${date.getDate()}日 ${date.getHours()}:${padNum(
    date.getMinutes(),
    2,
  )}:${padNum(date.getSeconds(), 2)}`
}

export default function RocCalendar({ date }: Props) {
  return (
    <Text as="div" fontSize={24} fontWeight="bold" lang="zh-Hant-TW">
      {convert(date)}
    </Text>
  )
}
