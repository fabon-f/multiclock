import { useEffect, useState } from 'react'
import { VStack } from '@kuma-ui/core'
import { Temporal } from 'temporal-polyfill'
import FrenchRepublicanCalendar from './calendars/FrenchRepublicanCalendar'
import JucheCalendar from './calendars/JucheCalendar'
import RocCalendar from './calendars/RocCalendar'

function App() {
  const [currentDate, setCurrentDate] = useState(
    Temporal.Now.zonedDateTimeISO(),
  )
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(Temporal.Now.zonedDateTimeISO())
    }, 40)
    return () => {
      clearInterval(timer)
    }
  }, [])
  return (
    <VStack m="auto" maxWidth="800px" gap={24}>
      <FrenchRepublicanCalendar date={currentDate} />
      <JucheCalendar date={currentDate} />
      <RocCalendar date={currentDate} />
    </VStack>
  )
}

export default App
