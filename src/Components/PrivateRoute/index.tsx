import React from 'react'
import { Route, Redirect, RouteComponentProps } from 'react-router-dom'
import { getCookie } from '../../Helpers'
// import { useAppSelector } from '../../store/hooks'

interface Props {
  Component: React.FC<RouteComponentProps>
  path: string
  exact?: boolean
}

const PrivateRoute = ({
  Component,
  path,
  exact = false,
  ...rest
}: Props): JSX.Element => {
  // const auth = useAppSelector(state => state.session.token)
  const auth = getCookie('@AUTH_TOKEN')

  return (
    <Route
      exact={exact}
      path={path}
      {...rest}
        render={(props: RouteComponentProps) =>
          auth
            ? <Component {...props}/>
            : <Redirect to={{
              pathname: '/authentication/login'
            }} />
        }
    />
  )
}

export default PrivateRoute
