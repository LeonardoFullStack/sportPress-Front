import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '../css/style.css'
import { Provider } from 'react-redux'
import { Auth0Provider } from "@auth0/auth0-react";
import store from './store/store.js'
import { BrowserRouter } from 'react-router-dom'

const domain = import.meta.env.VITE_APP_AUTH0_DOMAIN
const clientId = import.meta.env.VITE_APP_CLIENT_ID

ReactDOM.createRoot(document.getElementById('root')).render(
<>
<BrowserRouter>
<Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: 'https://sportpress.netlify.app/'
      }}
    >
  <Provider store={store}>
    <App />
    
  </Provider>
  </Auth0Provider>
  </BrowserRouter>
  </>
)
