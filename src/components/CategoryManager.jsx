import { useId, useState } from 'react'
import { useAppPreferences } from '../contexts/useAppPreferences.js'

export const CategoryManager = ({ categories, onCreate, onDelete }) => {
    const { t } = useAppPreferences()
    const [form, setForm] = useState({ name: '', type: 'expense' })
    const [isOpen, setIsOpen] = useState(false)
    const nameId = useId()
    const typeId = useId()

    const handleChange = (event) => {
        const { name, value } = event.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!form.name.trim()) return
        onCreate({ ...form, name: form.name.trim() })
        setForm((prev) => ({ ...prev, name: '' }))
    }

    const grouped = categories.reduce(
        (acc, category) => {
            acc[category.type].push(category)
            return acc
        },
        { income: [], expense: [] }
    )

    return (
        <div className="rounded-2xl border border-muted bg-surface shadow-sm">
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex w-full items-center justify-between p-5 text-left"
            >
                <div>
                    <h3 className="text-lg font-semibold">
                        {t('categoryPanel.title')}
                    </h3>
                    <p className="text-sm text-muted">
                        {t('categoryPanel.formTitle')}
                    </p>
                </div>
                <svg
                    className={`h-5 w-5 text-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>

            {isOpen && (
                <div className="space-y-4 px-5 pb-5">
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-3 rounded-xl bg-app p-4"
                    >
                        <div className="flex flex-col gap-3 md:flex-row">
                            <label
                                className="flex-1 text-sm font-semibold text-muted"
                                htmlFor={nameId}
                            >
                                {t('categoryPanel.inputLabel')}
                                <input
                                    id={nameId}
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder={t('categoryPanel.placeholder')}
                                    className="mt-1 w-full rounded-xl border border-muted bg-surface px-3 py-2 text-base"
                                />
                            </label>
                            <label
                                className="text-sm font-semibold text-muted"
                                htmlFor={typeId}
                            >
                                {t('categoryPanel.typeLabel')}
                                <select
                                    id={typeId}
                                    name="type"
                                    value={form.type}
                                    onChange={handleChange}
                                    className="mt-1 rounded-xl border border-muted bg-surface px-3 py-2 text-base"
                                >
                                    <option value="income">
                                        {t('form.typeIncome')}
                                    </option>
                                    <option value="expense">
                                        {t('form.typeExpense')}
                                    </option>
                                </select>
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="w-full rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
                        >
                            {t('categoryPanel.submit')}
                        </button>
                    </form>

                    <div>
                        <h4 className="text-sm font-semibold text-muted">
                            {t('categoryPanel.listTitle')}
                        </h4>
                        {categories.length === 0 ? (
                            <p className="mt-2 text-sm text-muted">
                                {t('categoryPanel.empty')}
                            </p>
                        ) : (
                            <div className="mt-3 space-y-3">
                                {['income', 'expense'].map((type) => (
                                    <div key={type}>
                                        <p className="text-xs uppercase tracking-wide text-muted">
                                            {t(
                                                `form.type${type === 'income' ? 'Income' : 'Expense'}`
                                            )}
                                        </p>
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {grouped[type].map((category) => (
                                                <span
                                                    key={category.id}
                                                    className="inline-flex items-center gap-2 rounded-full border border-muted px-3 py-1 text-sm"
                                                >
                                                    {category.name}
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            onDelete(
                                                                category.id
                                                            )
                                                        }
                                                        className="text-xs font-semibold text-attention hover:underline"
                                                    >
                                                        {t(
                                                            'categoryPanel.remove'
                                                        )}
                                                    </button>
                                                </span>
                                            ))}
                                            {grouped[type].length === 0 ? (
                                                <span className="text-sm text-muted">
                                                    —
                                                </span>
                                            ) : null}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
