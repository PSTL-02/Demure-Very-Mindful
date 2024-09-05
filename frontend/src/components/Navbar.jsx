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

          {/* left side */}
          <div className='logo-header'>
          <Link to='/'>
            <img src="/images/demure-high-resolution-logo-black-transparent.png" alt="our-logo"/>
            </Link>
            <h1> 2402 Class Portfolio </h1>
          </div>

          {/* right side */}
          <div className='right-side'>
          {user && <div className=' userInt'>
                <span>{user.email}</span>
                <button onClick={handleClick} className='Logout-btn'>Logout</button>
              </div>}


              {!user && <div className='login-logout'>
                <Link to='/login'>Login</Link>
                <Link to='/signup'>Sign Up</Link>
              </div>}
          </div>
        </div>




        {/* <div className='container'>
          <Link to='/'>
            <img src="/images/demure-high-resolution-logo-black-transparent.png" alt="our-logo"/>
            </Link>
            <nav>
              {user && <div className=' userInt'>
                <span>{user.email}</span>
                <button onClick={handleClick} className='Logout-btn'>Logout</button>
              </div>}


              {!user && <div className='login-logout'>
                <Link to='/login'>Login</Link>
                <Link to='/signup'>Sign Up</Link>
              </div>}
            </nav>
        </div> */}
    </header>
  )
}

export default Navbar
