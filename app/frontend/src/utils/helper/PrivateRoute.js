import React from 'react'
import { Navigate} from 'react-router-dom'

const PrivateRoute=({children, isAuthenticated}) =>{
  
  return isAuthenticated?children:<Navigate  to={`/signin`} replace/>
}

export default PrivateRoute
