import { useAppPreferences } from '../contexts/useAppPreferences.js'

const formatAmount = (formatCurrency, type, amount) => {
    const formatted = formatCurrency(Math.abs(amount))
    return type === 'expense' ? `- ${formatted}` : `+ ${formatted}`
}

export const EntryTable = ({ entries, onDelete }) => {
    const { formatCurrency, t } = useAppPreferences()

    if (!entries.length) {
        return (
            <div className="rounded-2xl border border-dashed border-muted bg-surface p-6 text-center text-muted">
                {t('table.empty')}
            </div>
        )
    }

    return (
        <div className="overflow-x-auto rounded-2xl border border-muted bg-surface shadow-sm">
            <table className="min-w-full text-left text-sm">
                <thead>
                    <tr className="text-muted">
                        <th className="border-b border-muted px-4 py-3 font-medium">
                            {t('table.headers.type')}
                        </th>
                        <th className="border-b border-muted px-4 py-3 font-medium">
                            {t('table.headers.category')}
                        </th>
                        <th className="border-b border-muted px-4 py-3 font-medium">
                            {t('table.headers.amount')}
                        </th>
                        <th className="border-b border-muted px-4 py-3 font-medium">
                            {t('table.headers.date')}
                        </th>
                        <th className="border-b border-muted px-4 py-3 font-medium">
                            {t('table.headers.notes')}
                        </th>
                        <th className="border-b border-muted px-4 py-3 font-medium text-right">
                            {t('table.headers.actions')}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {entries.map((entry) => (
                        <tr key={entry.id} className="text-base">
                            <td className="border-b border-muted px-4 py-3 font-semibold capitalize">
                                {t(
                                    `form.type${entry.type === 'income' ? 'Income' : 'Expense'}`
                                )}
                            </td>
                            <td className="border-b border-muted px-4 py-3">
                                {entry.category}
                            </td>
                            <td className="border-b border-muted px-4 py-3 font-semibold">
                                <span
                                    className={
                                        entry.type === 'income'
                                            ? 'text-income'
                                            : 'text-expense'
                                    }
                                >
                                    {formatAmount(
                                        formatCurrency,
                                        entry.type,
                                        entry.amount
                                    )}
                                </span>
                            </td>
                            <td className="border-b border-muted px-4 py-3">
                                {entry.date}
                            </td>
                            <td className="border-b border-muted px-4 py-3 text-sm text-muted">
                                {entry.notes || '-'}
                            </td>
                            <td className="border-b border-muted px-4 py-3 text-right">
                                <button
                                    type="button"
                                    onClick={() => onDelete(entry.id)}
                                    className="text-sm font-semibold text-accent underline-offset-4 hover:underline"
                                >
                                    {t('table.delete')}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
