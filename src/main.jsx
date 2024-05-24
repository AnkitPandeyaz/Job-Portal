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



// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import router from './Router/Router.jsx';
// import { RouterProvider } from 'react-router-dom';
// import App from "./App";
// import { createRoot } from 'react-dom/client';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <RouterProvider router={router}>
//       <App />
//     </RouterProvider>
//   </React.StrictMode>
// );


import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import router from './Router/Router.jsx';
import { RouterProvider } from 'react-router-dom';
import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);

