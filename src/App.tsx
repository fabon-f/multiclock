import { useEffect, useState } from 'react'
import { VStack } from '@kuma-ui/core'
import FrenchRepublicanCalendar from './calendars/FrenchRepublicanCalendar'
import JucheCalendar from './calendars/JucheCalendar'
import RocCalendar from './calendars/RocCalendar'

function App() {
  const [currentDate, setCurrentDate] = useState(new Date())
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date())
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
