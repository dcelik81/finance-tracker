import { useCallback, useMemo, useState } from 'react'
import {
    CURRENCY_KEY,
    LANGUAGE_KEY,
    currencyOptions,
    languageOptions,
    locales,
    translations,
} from './appPreferencesConfig.js'
import { AppPreferencesContext } from './AppPreferencesContext.js'

const getInitialPreference = (storageKey, fallback) => {
    if (typeof window === 'undefined') return fallback
    return window.localStorage.getItem(storageKey) || fallback
}

export const AppPreferencesProvider = ({ children }) => {
    const [language, setLanguageState] = useState(() =>
        getInitialPreference(LANGUAGE_KEY, 'en')
    )
    const [currency, setCurrencyState] = useState(() =>
        getInitialPreference(CURRENCY_KEY, 'TRY')
    )

    const setLanguage = useCallback((next) => {
        setLanguageState(next)
        if (typeof window !== 'undefined') {
            window.localStorage.setItem(LANGUAGE_KEY, next)
        }
    }, [])

    const setCurrency = useCallback((next) => {
        setCurrencyState(next)
        if (typeof window !== 'undefined') {
            window.localStorage.setItem(CURRENCY_KEY, next)
        }
    }, [])

    const t = useCallback(
        (path) => {
            const segments = path.split('.')
            return (
                segments.reduce(
                    (acc, key) => acc?.[key],
                    translations[language]
                ) ?? path
            )
        },
        [language]
    )

    const formatCurrency = useMemo(() => {
        const formatter = new Intl.NumberFormat(locales[language] ?? 'en-US', {
            style: 'currency',
            currency,
        })
        return (value) => formatter.format(value)
    }, [currency, language])

    const value = useMemo(
        () => ({
            language,
            setLanguage,
            currency,
            setCurrency,
            t,
            formatCurrency,
            languageOptions,
            currencyOptions,
        }),
        [currency, formatCurrency, language, setCurrency, setLanguage, t]
    )

    return (
        <AppPreferencesContext.Provider value={value}>
            {children}
        </AppPreferencesContext.Provider>
    )
}
