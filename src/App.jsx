import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ThemeToggle } from './components/ThemeToggle'
import { useAppPreferences } from './contexts/useAppPreferences.js'
import { TrackerPage } from './pages/TrackerPage'

const THEME_KEY = 'expense-tracker-theme'

const getInitialTheme = () => {
    if (typeof window === 'undefined') return 'light'
    const stored = window.localStorage.getItem(THEME_KEY)
    if (stored === 'dark' || stored === 'light') return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
}

const App = () => {
    const [theme, setTheme] = useState(getInitialTheme)
    const {
        language,
        setLanguage,
        currency,
        setCurrency,
        t,
        languageOptions,
        currencyOptions,
    } = useAppPreferences()

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        window.localStorage.setItem(THEME_KEY, theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
    }

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value)
    }

    const handleCurrencyChange = (event) => {
        setCurrency(event.target.value)
    }

    return (
        <div className="min-h-screen bg-app">
            <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-6">
                <header className="rounded-2xl border border-muted bg-surface p-5 shadow-sm">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <p className="text-sm text-muted">
                                {t('header.subtitle')}
                            </p>
                            <h1 className="text-2xl font-semibold">
                                {t('header.title')}
                            </h1>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
                                <label className="flex flex-col text-xs font-semibold text-muted">
                                    {t('controls.language')}
                                    <select
                                        value={language}
                                        onChange={handleLanguageChange}
                                        className="mt-1 rounded-xl border border-muted bg-app px-3 py-2 text-sm font-semibold text-left"
                                    >
                                        {languageOptions.map((option) => (
                                            <option
                                                key={option.code}
                                                value={option.code}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                                <label className="flex flex-col text-xs font-semibold text-muted">
                                    {t('controls.currency')}
                                    <select
                                        value={currency}
                                        onChange={handleCurrencyChange}
                                        className="mt-1 rounded-xl border border-muted bg-app px-3 py-2 text-sm font-semibold text-left"
                                    >
                                        {currencyOptions.map((option) => (
                                            <option
                                                key={option.code}
                                                value={option.code}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                                <ThemeToggle
                                    theme={theme}
                                    onToggle={toggleTheme}
                                />
                            </div>
                        </div>
                    </div>
                </header>

                <main className="mt-6 flex-1 pb-10">
                    <Routes>
                        <Route path="/" element={<TrackerPage />} />
                    </Routes>
                </main>

                <footer className="text-center text-xs text-muted">
                    {t('footer.note')} · {new Date().getFullYear()}
                </footer>
            </div>
        </div>
    )
}

export default App
