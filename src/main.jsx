import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { FirebaseProvider } from './context/Firebase.jsx'
import { BrowserRouter } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FirebaseProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FirebaseProvider>
  </React.StrictMode>,
)
