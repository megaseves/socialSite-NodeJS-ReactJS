import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from "react-auth-kit";
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <AuthProvider authType={"cookie"} authName={"_auth"} cookieDomain={window.location.hostname} coockieSecure={window.location.protocol === "https:"}>

          <BrowserRouter>
              <App />
          </BrowserRouter>

      </AuthProvider>

  </React.StrictMode>
);

