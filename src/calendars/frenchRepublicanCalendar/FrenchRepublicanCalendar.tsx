import { useState } from 'react'
import { Temporal } from 'temporal-polyfill'
import { Text, VStack } from '@kuma-ui/core'
import { convert } from './calendarUtils'

interface Props {
  date: Temporal.ZonedDateTime
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
