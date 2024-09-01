import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import './App.css'

// Import Pages
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Signup from './pages/SignUp'
import Login from './pages/Login'
import SingleProject from './pages/SingleProject';
import Footer from './components/Footer'

const App =() => {
  const {user} = useAuthContext();
  
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar/>
        <div className='pages'>
          <Routes>
            {/* If we have a user show home, else go to login: */}
            <Route path='/' element={user ? <Home/> : <Navigate to="/login"/>}/>
            <Route path='/:id' element={user ? <SingleProject/> : <Navigate to="/login"/>}/>
            {/* If we don't have a user show login, if we do have a user got to home  */}
            <Route path='/login' element={!user ? <Login/> : <Navigate to="/"/>}/>
            {/* If we don't have a user show signup, if we do show home */}
            <Route path='/signup' element={!user ? <Signup/> : <Navigate to="/"/>}/>
          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App
