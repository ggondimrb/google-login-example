import { BrowserRouter as Router, Routes as BrouseRoutes, Route, Outlet, Navigate } from 'react-router-dom'

import { SignIn } from "./pages/SignIn";
import { Dashboard } from "./pages/Dashboard";
import { useAuth } from './contexts/auth';

export function Routes() {
  const { getIsAuthenticated } = useAuth();

  const PrivateRoutes = () => {
    return (
      getIsAuthenticated() ? <Outlet /> : <Navigate to='/' />
    )
  }

  return (
    <Router>
      <BrouseRoutes>
        <Route element={<PrivateRoutes />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route path='/' element={<SignIn />} />
        <Route path='/*' element={<SignIn />} />
      </BrouseRoutes>
    </Router>
  )
}