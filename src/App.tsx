import { useEffect, useState } from 'react'
import { VStack } from '@kuma-ui/core'
import FrenchRepublicanCalendar from './calendars/FrenchRepublicanCalendar'

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
    </VStack>
  )
}

export default App
