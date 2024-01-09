import { useState } from 'react'
import { Text, VStack } from '@kuma-ui/core'
import { padNum } from '../utils'

interface Props {
  date: Date
}

function convertTime(date: Date) {
  const elapsedSeconds =
    date.getHours() * 3600 +
    date.getMinutes() * 60 +
    date.getSeconds() +
    date.getMilliseconds() / 1000
  const elapsedDecimalSeconds = (elapsedSeconds / 86400) * 100000
  const decimalHour = Math.floor(elapsedDecimalSeconds / 10000)
  const decimalMinute = Math.floor(
    (elapsedDecimalSeconds - decimalHour * 10000) / 100,
  )
  const decimalSecond = Math.floor(
    elapsedDecimalSeconds - Math.floor(elapsedDecimalSeconds / 100) * 100,
  )
  return {
    hour: decimalHour,
    minute: decimalMinute,
    second: decimalSecond,
  }
}

function convertTimezone(date: Date, isParis: boolean): Date {
  if (isParis) {
    // until 1911 Paris Mean Time is 560.935 seconds ahead of Greenwich Mean Time
    return new Date(
      date.getTime() + date.getTimezoneOffset() * 60 * 1000 + 560935,
    )
  }
  return date
}

function convert(date: Date, isParis: boolean) {
  const localDate = convertTimezone(date, isParis)
  return convertTime(localDate)
}

export default function FrenchRepublicanCalendar({ date }: Props) {
  const [isParis, setIsParis] = useState(false)
  const result = convert(date, isParis)
  return (
    <VStack gap={16}>
      <Text as="div" fontSize={24} fontWeight="bold">
        {result.hour} {padNum(result.minute, 2)} {padNum(result.second, 2)}
      </Text>
      <div>
        <label>
          <input
            type="checkbox"
            checked={isParis}
            onChange={(e) => {
              setIsParis(e.target.checked)
            }}
          />
          パリ時間 (1911年以前)
        </label>
      </div>
    </VStack>
  )
}
