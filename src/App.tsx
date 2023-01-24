import './styles/main.css'
import RoutesApp from "./routes"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserContextProvider } from './context/UserContext';

function App() {
  return (
    <Router>
      <UserContextProvider>
        <RoutesApp />
      </UserContextProvider>
    </Router>
  )
}

export default App
