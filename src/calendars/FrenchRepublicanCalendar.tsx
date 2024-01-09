import { useState } from 'react'
import { Temporal } from 'temporal-polyfill'
import { Text, VStack } from '@kuma-ui/core'
import { padNum } from '../utils'

interface Props {
  date: Temporal.ZonedDateTime
}

function convertTime(time: Temporal.PlainTime) {
  const elapsedSeconds =
    time.hour * 3600 + time.minute * 60 + time.second + time.millisecond / 1000
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

function toDateTime(date: Temporal.ZonedDateTime, isParis: boolean) {
  if (isParis) {
    // until 1911 Paris Mean Time is 560.935 seconds ahead of Greenwich Mean Time
    return date
      .withTimeZone('UTC')
      .add(Temporal.Duration.from({ seconds: 560, milliseconds: 935 }))
      .toPlainDateTime()
  }
  return date.toPlainDateTime()
}

function convert(date: Temporal.ZonedDateTime, isParis: boolean) {
  const dateTime = toDateTime(date, isParis)
  const republicanTime = convertTime(dateTime.toPlainTime())
  return `${republicanTime.hour} ${padNum(republicanTime.minute, 2)} ${padNum(
    republicanTime.second,
    2,
  )}`
}

export default function FrenchRepublicanCalendar({ date }: Props) {
  const [isParis, setIsParis] = useState(false)
  return (
    <VStack gap={16}>
      <Text as="div" fontSize={24} fontWeight="bold">
        {convert(date, isParis)}
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
