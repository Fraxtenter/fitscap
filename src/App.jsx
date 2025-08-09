import { useState } from 'react'
import FitscapeHero from './fitscape22'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import ClothingStore from './productlisting1'


function App() {

  return (
    <>
      
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<FitscapeHero />} />
        <Route path='/products' element={<ClothingStore />}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
