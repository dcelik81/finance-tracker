import { useMemo } from 'react'
import { useAppPreferences } from '../contexts/useAppPreferences.js'

export const EntryFilters = ({ filters, onChange, entries }) => {
    const { t } = useAppPreferences()

    const uniqueCategories = useMemo(() => {
        const categories = new Set(entries.map((entry) => entry.category))
        return Array.from(categories).sort()
    }, [entries])

    const handleChange = (key, value) => {
        onChange({ ...filters, [key]: value })
    }

    const handleClear = () => {
        onChange({
            notes: '',
            category: '',
            type: '',
            minAmount: '',
            maxAmount: '',
        })
    }

    const hasActiveFilters =
        filters.notes ||
        filters.category ||
        filters.type ||
        filters.minAmount ||
        filters.maxAmount

    return (
        <div className="rounded-2xl border border-muted bg-surface p-4 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-muted">
                    {t('filters.title')}
                </h3>
                {hasActiveFilters && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="text-sm font-semibold text-accent underline-offset-4 hover:underline"
                    >
                        {t('filters.clear')}
                    </button>
                )}
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {/* Notes search */}
                <div>
                    <label className="text-sm text-muted mb-1 block">
                        {t('filters.notes')}
                    </label>
                    <input
                        type="text"
                        value={filters.notes}
                        onChange={(e) => handleChange('notes', e.target.value)}
                        placeholder={t('filters.notesPlaceholder')}
                        className="w-full rounded-xl border border-muted bg-app px-3 py-2 text-sm"
                    />
                </div>

                {/* Category filter */}
                <div>
                    <label className="text-sm text-muted mb-1 block">
                        {t('filters.category')}
                    </label>
                    <select
                        value={filters.category}
                        onChange={(e) => handleChange('category', e.target.value)}
                        className="w-full rounded-xl border border-muted bg-app px-3 py-2 text-sm"
                    >
                        <option value="">{t('filters.allCategories')}</option>
                        {uniqueCategories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Type filter */}
                <div>
                    <label className="text-sm text-muted mb-1 block">
                        {t('filters.type')}
                    </label>
                    <select
                        value={filters.type}
                        onChange={(e) => handleChange('type', e.target.value)}
                        className="w-full rounded-xl border border-muted bg-app px-3 py-2 text-sm"
                    >
                        <option value="">{t('filters.allTypes')}</option>
                        <option value="income">{t('form.typeIncome')}</option>
                        <option value="expense">{t('form.typeExpense')}</option>
                    </select>
                </div>

                {/* Min amount */}
                <div>
                    <label className="text-sm text-muted mb-1 block">
                        {t('filters.minAmount')}
                    </label>
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={filters.minAmount}
                        onChange={(e) => handleChange('minAmount', e.target.value)}
                        placeholder={t('filters.minPlaceholder')}
                        className="w-full rounded-xl border border-muted bg-app px-3 py-2 text-sm"
                    />
                </div>

                {/* Max amount */}
                <div>
                    <label className="text-sm text-muted mb-1 block">
                        {t('filters.maxAmount')}
                    </label>
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={filters.maxAmount}
                        onChange={(e) => handleChange('maxAmount', e.target.value)}
                        placeholder={t('filters.maxPlaceholder')}
                        className="w-full rounded-xl border border-muted bg-app px-3 py-2 text-sm"
                    />
                </div>
            </div>
        </div>
    )
}

