import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import router from './components/router/router';
import ContextProvider from './contextApi/ContextProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <div className='max-w-[1200px] mx-auto' >
    <ContextProvider>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>,
    </ContextProvider>
  </div>
)
