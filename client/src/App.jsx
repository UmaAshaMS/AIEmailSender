import React from 'react'
import Home from './pages/Home'
import { EmailProvider } from './Context/EmailContex'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>


        <EmailProvider>
          <Routes>
            <Route path='/' element={<Home />}/>
          </Routes>
          
        </EmailProvider>
      </Router>
    </>
  )
}

export default App