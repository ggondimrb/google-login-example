import { SignIn } from "./pages/SignIn";
import { gapi } from 'gapi-script';
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom'
import { Dashboard } from "./pages/Dashboard";
import { AuthProvider } from "./contexts/auth";

const clientId = ""

function App() {

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ""
      })
    }

    gapi.load('client:auth2', start);
  });

  const PrivateRoutes = () => {
    let auth = { 'token': true }
    return (
      auth.token ? <Outlet /> : <Navigate to='/' />
    )
  }

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>
          <Route path='/' element={<SignIn />} />
          <Route path='/*' element={<SignIn />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
