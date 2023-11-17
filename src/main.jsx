import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom"
// import store from './store.js'
import { Provider } from 'react-redux'
import authReducer from  './slices/authSlice.js'
import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, authReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});



ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store ={store}>
  <React.StrictMode>
    <BrowserRouter>
    <PersistGate loading={null} persistor={persistStore(store)}>
    <App />
    </PersistGate>
    </BrowserRouter>
  </React.StrictMode>
  </Provider>
)
