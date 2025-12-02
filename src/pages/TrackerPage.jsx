import { useMemo, useState } from 'react'
import { CategoryManager } from '../components/CategoryManager'
import { EntryForm } from '../components/EntryForm'
import { EntryTable } from '../components/EntryTable'
import { SummaryCards } from '../components/SummaryCards'
import { useAppPreferences } from '../contexts/useAppPreferences.js'
import { useCategories } from '../hooks/useCategories'
import { useEntries } from '../hooks/useEntries'

export const TrackerPage = () => {
    const { entries, totals, loading, error, addEntry, removeEntry, updateEntry } =
        useEntries()
    const [editingEntry, setEditingEntry] = useState(null)
    const {
        categories,
        loading: categoriesLoading,
        error: categoryError,
        addCategory,
        removeCategory,
    } = useCategories()
    const { t } = useAppPreferences()

    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const handleEndDateChange = (e) => {
        const newEndDate = e.target.value
        setEndDate(newEndDate)

        if (!startDate && newEndDate) {
            const end = new Date(newEndDate)
            end.setDate(end.getDate() - 30)
            setStartDate(end.toISOString().split('T')[0])
        }
    }

    const filteredTotals = useMemo(() => {
        if (!startDate && !endDate) return totals

        const filtered = entries.filter((entry) => {
            const entryDate = entry.date
            if (startDate && entryDate < startDate) return false
            if (endDate && entryDate > endDate) return false
            return true
        })

        return filtered.reduce(
            (acc, entry) => {
                if (entry.type === 'income') {
                    acc.income += entry.amount
                } else {
                    acc.expense += entry.amount
                }
                acc.net = acc.income - acc.expense
                return acc
            },
            { income: 0, expense: 0, net: 0 }
        )
    }, [entries, totals, startDate, endDate])

    return (
        <div className="space-y-6">
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">
                    {t('sections.overview')}
                </h2>
                <SummaryCards totals={filteredTotals} />
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                    <label className="flex flex-col text-sm font-semibold text-muted">
                        {t('dateFilter.startDate')}
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="mt-1 rounded-xl border border-muted bg-surface px-3 py-2 text-base"
                        />
                    </label>
                    <label className="flex flex-col text-sm font-semibold text-muted">
                        {t('dateFilter.endDate')}
                        <input
                            type="date"
                            value={endDate}
                            onChange={handleEndDateChange}
                            className="mt-1 rounded-xl border border-muted bg-surface px-3 py-2 text-base"
                        />
                    </label>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-semibold">
                    {t('sections.quickEntry')}
                </h2>
                <EntryForm
                    onSubmit={addEntry}
                    onUpdate={(id, payload) => {
                        updateEntry(id, payload)
                        setEditingEntry(null)
                    }}
                    onCancelEdit={() => setEditingEntry(null)}
                    editingEntry={editingEntry}
                    categories={categories}
                />
            </section>

            <section className="space-y-4">
                {categoriesLoading ? (
                    <p className="text-sm text-muted">{t('tracker.loading')}</p>
                ) : null}
                {categoryError ? (
                    <div className="rounded-2xl border border-muted bg-app p-4 text-sm text-attention">
                        {categoryError}
                    </div>
                ) : null}
                <CategoryManager
                    categories={categories}
                    onCreate={addCategory}
                    onDelete={removeCategory}
                />
            </section>

            <section className="space-y-4">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <h2 className="text-xl font-semibold">
                        {t('sections.allEntries')}
                    </h2>
                    {loading ? (
                        <p className="text-sm text-muted">
                            {t('tracker.loading')}
                        </p>
                    ) : null}
                </div>
                {error ? (
                    <div className="rounded-2xl border border-muted bg-app p-4 text-sm text-attention">
                        {error}
                    </div>
                ) : null}
                <EntryTable
                    entries={entries}
                    onDelete={removeEntry}
                    onEdit={setEditingEntry}
                />
            </section>
        </div>
    )
}
