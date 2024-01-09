import { expect, test } from 'vitest'
import { Temporal } from 'temporal-polyfill'
import { convertTime, convertDate } from './calendarUtils'

test('decimal time', () => {
  expect(convertTime(Temporal.PlainTime.from('12:34:56'))).toStrictEqual({
    hour: 5,
    minute: 24,
    second: 25,
  })
})

test('republican calendar', () => {
  expect(convertDate(Temporal.PlainDate.from('2023-09-23'))).toBe(
    '1 Vendémiaire an CCXXXII',
  )
  expect(convertDate(Temporal.PlainDate.from('2023-09-22'))).toBe(
    'La Fête des Récompenses, an CCXXXI',
  )
  // leap year
  expect(convertDate(Temporal.PlainDate.from('2022-09-22'))).toBe(
    'La Fête de la Révolution, an CCXXX',
  )
})
