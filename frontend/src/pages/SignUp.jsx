import { useState } from "react"
import {useSignup} from '../hooks/useSignup'


const SignUp = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {signup, error, isLoading} = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault(); 
    
        await signup(email, password) 
    }

  return (
    <>
      <h1 className="site-title"> 2402 Class Portfolio </h1>

      <form className='signup' onSubmit={handleSubmit}>
        <h3> Sign Up </h3>

        <label> Email: </label>
        <input type='email'onChange={(e) => setEmail(e.target.value)} value={email}/>

        <label> Password: </label>
        <input type='password' autoComplete='password' onChange={(e) => setPassword(e.target.value)} value={password}/>

        <button disabled={isLoading}> Sign Up </button>
        {error && <div className='error'> {error} </div>}

    </form>

    </>
  )
}

export default SignUp
