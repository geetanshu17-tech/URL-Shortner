import React from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
import { useState } from 'react'

const AuthPage = () => {

    const [login, setLogin] = useState(true)
    return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        {login ? <LoginForm state={setLogin}/> : <RegisterForm/>}
    </div>
  
  )
}

export default AuthPage