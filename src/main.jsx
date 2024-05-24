// import ReactDOM from 'react-dom/client'
// import './index.css'
// import router from './Router/Router.jsx'
// import { RouterProvider } from 'react-router-dom'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   <RouterProvider router={router} />
// )
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import router from './Router/Router.jsx';
import { RouterProvider } from 'react-router-dom';
import App from "./App";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);
