import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import router from './Router/router.jsx';
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
