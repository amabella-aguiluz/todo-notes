import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './pages/auth/login'
import NotesPreview from './pages/notes/notespreview'
import RegisterPage from './pages/auth/register'

function App() {
  const [count, setCount] = useState(0)

  return (
      <div>
        <RegisterPage />
      {/* <NotesPreview /> */}
      </div>
  )
}

export default App;
