import { useState } from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from "./routes/appRoutes";

function App() {
  const [count, setCount] = useState(0)

  return (
    <AppRoutes />
  )
}

export default App;
