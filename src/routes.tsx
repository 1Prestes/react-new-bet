import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import PrivateRoute from './Components/PrivateRoute'
import SignIn from './Pages/Sign-In'
import Home from './Pages/Home'
import NewBet from './Components/NewBet'

const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path='/authentication' component={SignIn} />
        <PrivateRoute>
          <Home />
        </PrivateRoute>
        <PrivateRoute>
          <NewBet />
        </PrivateRoute>
        <Route exact path='/' component={Home} />
      </Switch>
    </Router>
  )
}

export default Routes
