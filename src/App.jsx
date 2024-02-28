import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Home } from './pages/Home'
import { Ads } from './pages/Ads'
import { Categories } from './pages/Categories'
import { Users } from './pages/Users'
import { Error } from './pages/Error'

import './styles/App.css'

function App() {
  return (
    <BrowserRouter basename='/clasificados/'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin/avisos' element={<Ads />} />
        <Route path='/admin/categorias' element={<Categories />} />
        <Route path='/admin/usuarios' element={<Users />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
