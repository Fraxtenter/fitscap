import { useState } from 'react'
import FitscapeHero from './fitscape22'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import ClothingStore from './productlisting1'
import FitscapeAuth from './login'
import AxiomWebsite from './axiom'
import OutfitCompatibilityChecker2 from './outfit'
import FitscapeCartPage from './cartpage'


function App() {

  return (
    <>
      
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<FitscapeHero />} />
        <Route path='/products' element={<ClothingStore />}/>
        <Route path='ju' element={<FitscapeAuth />}/>
      <Route path='pu' element={<AxiomWebsite />}/>
        <Route path='tu' element={<OutfitCompatibilityChecker2/>}/>
        
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
