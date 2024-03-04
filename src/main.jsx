import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

export const Context = createContext();

ReactDOM.createRoot(document.getElementById('root')).render(
    <App />        
)
