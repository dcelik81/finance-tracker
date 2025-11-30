import { useContext } from 'react'
import { AppPreferencesContext } from './AppPreferencesContext.js'

export const useAppPreferences = () => {
    const context = useContext(AppPreferencesContext)
    if (!context) {
        throw new Error(
            'useAppPreferences must be used within AppPreferencesProvider'
        )
    }
    return context
}
