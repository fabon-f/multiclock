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

export default function FrenchRepublicanCalendar({ date }: Props) {
  const result = convertTime(date)
  return (
    <div>
      {result.hour} {result.minute} {result.second}
    </div>
  )
}
