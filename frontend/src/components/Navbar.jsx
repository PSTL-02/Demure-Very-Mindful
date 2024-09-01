import {Link} from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
    const {logout} = useLogout()
    const {user} = useAuthContext()
  
    const handleClick = () => {
      logout()
    }
  
  return (
    <header>
        <div className='container'>
            <Link to='/'>
            <img src="/images/demure-high-resolution-logo-black-transparent.png" alt="our-logo"/>
            </Link>
            <nav>
              {user && <div>
                <span>{user.email}</span>
                <button onClick={handleClick} className='Logout-btn'>Logout</button>
              </div>}


              {!user && <div>
                <Link to='/login'>Login</Link>
                <Link to='/signup'>Sign Up</Link>
              </div>}
            </nav>
        </div>
    </header>
  )
}

export default Navbar
