import { Temporal } from 'temporal-polyfill'
import { autumnalEquinox, padNum, toRoman } from '../../utils'

export function convertTime(time: Temporal.PlainTime) {
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

function lastAutumnalEquinoxInParis(date: Temporal.PlainDate) {
  const equinoxDate = convertToLegacyParisTime(
    autumnalEquinox(date.year),
  ).toPlainDate()
  if (Temporal.PlainDate.compare(equinoxDate, date) === 1) {
    // Last year
    return convertToLegacyParisTime(
      autumnalEquinox(date.year - 1),
    ).toPlainDate()
  } else {
    return equinoxDate
  }
}

export function convertDate(date: Temporal.PlainDate) {
  const equinoxDate = lastAutumnalEquinoxInParis(date)
  const year = toRoman(equinoxDate.year - 1791)
  const days = equinoxDate.until(date).days
  if (days < 360) {
    const month = [
      'Vendémiaire',
      'Brumaire',
      'Frimaire',
      'Nivôse',
      'Pluviôse',
      'Ventôse',
      'Germinal',
      'Floréal',
      'Prairial',
      'Messidor',
      'Thermidor',
      'Fructidor',
    ][Math.floor(days / 30)]
    const day = (days % 30) + 1
    return `${day} ${month} an ${year}`
  }
  const dayName = [
    'La Fête de la Vertu',
    'La Fête du Génie',
    'La Fête du Travail',
    "La Fête de l'Opinion",
    'La Fête des Récompenses',
    'La Fête de la Révolution',
  ][days - 360]
  if (!dayName) {
    throw new Error('Assertion')
  }
  return `${dayName}, an ${year}`
}

function convertToLegacyParisTime(
  date: Temporal.ZonedDateTime | Temporal.Instant,
): Temporal.PlainDateTime {
  const utcDate =
    date instanceof Temporal.ZonedDateTime
      ? date.withTimeZone('UTC')
      : date.toZonedDateTimeISO('UTC')

  return (
    utcDate
      // until 1911 Paris Mean Time is 560.935 seconds ahead of Greenwich Mean Time
      .add(Temporal.Duration.from({ seconds: 560, milliseconds: 935 }))
      .toPlainDateTime()
  )
}

function toDateTime(
  date: Temporal.ZonedDateTime,
  isParis: boolean,
): Temporal.PlainDateTime {
  if (isParis) {
    return convertToLegacyParisTime(date)
  }
  return date.toPlainDateTime()
}

export function convert(date: Temporal.ZonedDateTime, isParis: boolean) {
  const dateTime = toDateTime(date, isParis)
  const republicanTime = convertTime(dateTime.toPlainTime())
  const republicanDate = convertDate(dateTime.toPlainDate())
  return `${republicanDate} ${republicanTime.hour} ${padNum(
    republicanTime.minute,
    2,
  )} ${padNum(republicanTime.second, 2)}`
}
