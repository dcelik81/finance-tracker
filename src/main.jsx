import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AppPreferencesProvider } from './contexts/AppPreferences.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <AppPreferencesProvider>
                <App />
            </AppPreferencesProvider>
        </BrowserRouter>
    </StrictMode>
)
