import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './pages/auth/login'
import NotesPreview from './pages/notes/notespreview'
import RegisterPage from './pages/auth/register'
import { BrowserRouter } from 'react-router-dom'
import { NotesRoutesTest } from './noteRouteTest'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <NotesRoutesTest />
      {/* <div>
        <RegisterPage />
      <NotesPreview /> 
      </div> */}
    </BrowserRouter>
  )
}

export default App;
