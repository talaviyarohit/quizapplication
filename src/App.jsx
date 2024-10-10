import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import QuizPage from './components/QuizPage'
import QuizList from './components/QuizList'
import { Route, Router, Routes } from 'react-router'
import ComputerHardware from './components/ComputerHardware'
import Software from './components/Software'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <QuizList/>
     <QuizPage/> */}
     <Routes>
        <Route path="/" element={<QuizList />} />
       <Route path="/quiz" element={<QuizPage />} />
       <Route path="/computerhardware" element={<ComputerHardware />} />
       <Route path="/computersoftware" element={<Software />} />
        
      </Routes>

    
    </>
  )
}

export default App
