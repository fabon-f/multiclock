import { useEffect, useState } from 'react'
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
    <div>
      <FrenchRepublicanCalendar date={currentDate} />
    </div>
  )
}

export default App
