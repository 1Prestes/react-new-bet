import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import PrivateRoute from './Components/PrivateRoute'
import Account from './Pages/Account'
import SignIn from './Pages/Authentication'
import Home from './Pages/Home/'
import NewBet from './Pages/NewBet'

const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path='/authentication' component={SignIn} />
        <PrivateRoute exact path='/' Component={Home} />
        <PrivateRoute path='/home' Component={Home} />
        <PrivateRoute path='/new-bet' Component={NewBet} />
        <PrivateRoute path='/account' Component={Account} />
      </Switch>
    </Router>
  )
}

export default Routes
