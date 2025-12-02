import { useEffect, useId, useMemo, useState } from 'react'
import { useAppPreferences } from '../contexts/useAppPreferences.js'

const initialState = () => ({
    type: 'expense',
    amount: '',
    category: '',
    date: new Date().toISOString().slice(0, 10),
    notes: '',
})

export const EntryForm = ({
    onSubmit,
    onUpdate,
    onCancelEdit,
    editingEntry,
    categories = [],
}) => {
    const { t } = useAppPreferences()
    const [form, setForm] = useState(() => initialState())
    const [errors, setErrors] = useState({})
    const amountId = useId()
    const categoryId = useId()
    const dateId = useId()
    const notesId = useId()
    const datalistId = useId()

    const isEditing = Boolean(editingEntry)

    useEffect(() => {
        if (editingEntry) {
            setForm({
                type: editingEntry.type,
                amount: String(editingEntry.amount),
                category: editingEntry.category,
                date: editingEntry.date,
                notes: editingEntry.notes || '',
            })
            setErrors({})
        } else {
            setForm(initialState())
        }
    }, [editingEntry])

    const categoryOptions = useMemo(
        () => categories.filter((category) => category.type === form.type),
        [categories, form.type]
    )

    const handleChange = (event) => {
        const { name, value } = event.target
        setForm((prev) => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }))
        }
    }

    const validate = () => {
        const nextErrors = {}
        if (!form.amount || Number(form.amount) <= 0) {
            nextErrors.amount = t('form.errors.amount')
        }
        if (!form.category.trim()) {
            nextErrors.category = t('form.errors.category')
        }
        if (!form.date) {
            nextErrors.date = t('form.errors.date')
        }
        setErrors(nextErrors)
        return Object.keys(nextErrors).length === 0
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!validate()) return
        if (isEditing) {
            onUpdate(editingEntry.id, form)
        } else {
            onSubmit(form)
        }
        setForm(initialState())
    }

    const handleCancel = () => {
        setForm(initialState())
        setErrors({})
        onCancelEdit?.()
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-surface border border-muted rounded-2xl p-5 lg:p-6 shadow-sm space-y-4"
        >
            <div className="flex flex-col gap-3 lg:flex-row">
                <div className="flex-1">
                    <p className="text-sm text-muted mb-1">
                        {t('form.entryType')}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                        {['income', 'expense'].map((option) => (
                            <button
                                key={option}
                                type="button"
                                className={`rounded-xl border border-muted py-2 text-sm font-semibold capitalize transition ${
                                    form.type === option
                                        ? 'bg-accent text-white'
                                        : 'bg-app'
                                }`}
                                onClick={() =>
                                    setForm((prev) => ({
                                        ...prev,
                                        type: option,
                                    }))
                                }
                            >
                                {t(
                                    `form.type${option === 'income' ? 'Income' : 'Expense'}`
                                )}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex-1">
                    <label
                        htmlFor={amountId}
                        className="text-sm text-muted mb-1 block"
                    >
                        {t('form.amount')}
                    </label>
                    <input
                        id={amountId}
                        name="amount"
                        type="number"
                        step="0.01"
                        min="0"
                        value={form.amount}
                        onChange={handleChange}
                        className={`w-full rounded-xl border border-muted bg-app px-4 py-2 text-base ${
                            errors.amount
                                ? 'outline outline-1 outline-accent'
                                : ''
                        }`}
                        placeholder="0.00"
                    />
                    {errors.amount ? (
                        <p className="mt-1 text-sm text-attention">
                            {errors.amount}
                        </p>
                    ) : null}
                </div>
            </div>

            <div className="flex flex-col gap-3 lg:flex-row">
                <div className="flex-1">
                    <label
                        htmlFor={categoryId}
                        className="text-sm text-muted mb-1 block"
                    >
                        {t('form.category')}
                    </label>
                    <input
                        id={categoryId}
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        list={datalistId}
                        className={`w-full rounded-xl border border-muted bg-app px-4 py-2 text-base ${
                            errors.category
                                ? 'outline outline-1 outline-accent'
                                : ''
                        }`}
                        placeholder={t('form.categoryPlaceholder')}
                    />
                    <datalist id={datalistId}>
                        {categoryOptions.map((category) => (
                            <option key={category.id} value={category.name} />
                        ))}
                    </datalist>
                    {errors.category ? (
                        <p className="mt-1 text-sm text-attention">
                            {errors.category}
                        </p>
                    ) : null}
                </div>
                <div className="flex-1">
                    <label
                        htmlFor={dateId}
                        className="text-sm text-muted mb-1 block"
                    >
                        {t('form.date')}
                    </label>
                    <input
                        id={dateId}
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        className={`w-full rounded-xl border border-muted bg-app px-4 py-2 text-base ${
                            errors.date
                                ? 'outline outline-1 outline-accent'
                                : ''
                        }`}
                    />
                    {errors.date ? (
                        <p className="mt-1 text-sm text-attention">
                            {errors.date}
                        </p>
                    ) : null}
                </div>
            </div>

            <div>
                <label
                    htmlFor={notesId}
                    className="text-sm text-muted mb-1 block"
                >
                    {t('form.notes')}
                </label>
                <textarea
                    id={notesId}
                    name="notes"
                    rows="3"
                    maxLength={280}
                    value={form.notes}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-muted bg-app px-4 py-2 text-base resize-none"
                    placeholder={t('form.notesPlaceholder')}
                />
            </div>

            <div className="flex gap-3 pt-2">
                {isEditing && (
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="flex-1 rounded-xl border border-muted bg-app px-4 py-3 text-base font-semibold transition hover:bg-surface"
                    >
                        {t('form.cancel')}
                    </button>
                )}
                <button
                    type="submit"
                    className="flex-1 rounded-xl bg-accent px-4 py-3 text-base font-semibold text-white shadow-sm transition hover:opacity-90"
                >
                    {isEditing ? t('form.update') : t('form.submit')}
                </button>
            </div>
        </form>
    )
}
