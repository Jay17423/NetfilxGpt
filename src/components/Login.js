import React, { useState } from 'react'
import Header from './Header'

const Login = () => {
  const [isSignInForm,setIsSingInForm] = useState(true);
  const toggleSignInForm = () =>{
      setIsSingInForm(!isSignInForm);
  }
  return (
  <div className="relative w-full h-screen">
  <Header />
  <div className="absolute inset-0 -z-10">
    <img 
      src="https://assets.nflxext.com/ffe/siteui/vlv3/fb5cb900-0cb6-4728-beb5-579b9af98fdd/web/IN-en-20250127-TRIFECTA-perspective_cf66f5a3-d894-4185-9106-5f45502fc387_large.jpg" 
      className="w-full h-full object-cover"
      alt="Background"
    />
  </div>

  <form className="w-3/12 flex flex-col absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80 ">
  <h1 className='text-3xl py-4 ml-2 font-bold'>{isSignInForm ? 'Sign In' : "Sign Up"}</h1>
  {!isSignInForm && (
      <input type="name" placeholder="Full Name" className="p-4 m-2 w-full bg-gray-700" />
    )}
    <input type="text" placeholder="Email Address" className="p-4 m-2 w-full bg-gray-700 " />
   
    <input type="password" placeholder="Password" className="p-4 m-2 w-full bg-gray-700" />
    
    <button className="p-2 m-2 bg-red-700 text-white rounded w-full">{isSignInForm ? 'Sign In' : "Sign Up"}</button>
    
    <p className='py-4 ml-2 cursor-pointer' onClick={toggleSignInForm}>{isSignInForm ? ' New to Netflix? Sign Up Now' : "Already registered ? signIn Now"}</p>
  </form>
</div>
  )
}

export default Login