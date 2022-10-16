import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import UserLogin from './Components/UserLogin'
import Pokedex from './Components/Pokedex'
import PokemonsDetail from './Components/PokemonsDetail'
import Protected from './Components/Protected'



function App() {
  const [count, setCount] = useState(0)

  return (

    <HashRouter>
      <div className='App'>
      <Routes>

        <Route path='/' element={<UserLogin/>}/>

        <Route element={<Protected/>}>
        <Route path='/Pokedex' element={<Pokedex/>}/>
        <Route path='/Pokedex/:id' element={<PokemonsDetail/>}/>
        </Route>


      </Routes>
      </div>
    </HashRouter>

  )
}

export default App
