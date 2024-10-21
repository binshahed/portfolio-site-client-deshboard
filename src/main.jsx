import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import { Provider } from 'react-redux'
import { persistor, store } from "./store/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";
import { RouterProvider } from "react-router-dom";
import router from './router/router.tsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
    <Toaster closeButton={true} />
  </StrictMode>,
)
