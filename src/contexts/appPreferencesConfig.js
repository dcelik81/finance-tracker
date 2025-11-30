export { translations } from './translations.js'

export const LANGUAGE_KEY = 'expense-tracker-language'
export const CURRENCY_KEY = 'expense-tracker-currency'

export const locales = {
    en: 'en-US',
    tr: 'tr-TR',
}

export const languageOptions = [
    { code: 'en', label: 'English' },
    { code: 'tr', label: 'Türkçe' },
]

export const currencyOptions = [
    { code: 'TRY', label: '₺ TRY' },
    { code: 'USD', label: '$ USD' },
    { code: 'EUR', label: '€ EUR' },
]
