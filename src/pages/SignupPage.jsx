import React from 'react'
import { Redirect } from 'react-router-dom'
import store from '../stores/store'
import Signup from '../components/auth/Signup'
import { view } from '@risingstack/react-easy-state'


function SignupPage() {
  return (
    <div className="signup-page">
      {store.auth.user ? <Redirect  to="/"/> :<Signup/>}
    </div>
  )
}
export default view(SignupPage)