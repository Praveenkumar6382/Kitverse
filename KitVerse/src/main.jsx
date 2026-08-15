import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider } from 'react-redux'
import { store } from './app/store.js'


import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { GoogleOAuthProvider } from "@react-oauth/google";

// entry point of react application
createRoot(document.getElementById('root')).render(
  // wrapping all components 
  <Provider store={store}>
  <StrictMode>
     <GoogleOAuthProvider
        clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
      >
    <App />
     <ToastContainer
      position="top-right"
      autoClose={3000}
    />
    </GoogleOAuthProvider>
  </StrictMode>
  </Provider>
)
