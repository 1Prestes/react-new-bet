import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './Pages/Home'
import SignIn from './Pages/Sign-In'

const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path='/authentication' component={SignIn} />
        <Route path='/home' component={Home} />
        <Route exact path='/' component={Home} />
      </Switch>
    </Router>
  )
}

export default Routes
