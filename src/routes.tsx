import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import PrivateRoute from './Components/PrivateRoute'
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
      </Switch>
    </Router>
  )
}

export default Routes
