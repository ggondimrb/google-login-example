import { gapi } from 'gapi-script';
import { useEffect } from "react";

import { AuthProvider } from "./contexts/auth";
import { Routes } from './routes';

const VITE_CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

function App() {

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: VITE_CLIENT_ID,
        scope: ""
      })
    }

    gapi.load('client:auth2', start);
  });

  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  )
}

export default App
