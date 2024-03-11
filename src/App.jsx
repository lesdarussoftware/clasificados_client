import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import { AuthProvider } from './providers/AuthProvider'

import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Ads } from './pages/Ads'
import { Categories } from './pages/Categories'
import { Users } from './pages/Users'
import { Error } from './pages/Error'

import './styles/App.css'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename='/noavisos/'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/admin' element={<Login />} />
          <Route path='/admin/avisos' element={<Ads />} />
          <Route path='/admin/categorias' element={<Categories />} />
          <Route path='/admin/usuarios' element={<Users />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
    </AuthProvider>
  )
}

export default App
