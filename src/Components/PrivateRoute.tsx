import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute: React.FC = ({ children, ...rest }) => {
  const auth = { user: false }
  return (
    <Route
      {...rest}
      render={() =>
        auth.user
          ? children
          : <Redirect to={{ pathname: '/authentication/login' }} />
      }
    />
  )
}

export default PrivateRoute
