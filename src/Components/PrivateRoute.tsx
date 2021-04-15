import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'

const PrivateRoute: React.FC = ({ children, ...rest }) => {
  const auth = useAppSelector(state => state.user.token)

  return (
    <Route
      {...rest}
      render={() =>
        auth
          ? children
          : <Redirect to={{ pathname: '/authentication/login' }} />
      }
    />
  )
}

export default PrivateRoute
