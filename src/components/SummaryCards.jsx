import { useMemo } from 'react'
import { useAppPreferences } from '../contexts/useAppPreferences.js'

const cardMeta = [
    {
        key: 'income',
        labelKey: 'summary.income',
        sign: '+',
        tone: 'text-income',
    },
    {
        key: 'expense',
        labelKey: 'summary.expense',
        sign: '-',
        tone: 'text-expense',
    },
    { key: 'net', labelKey: 'summary.net', sign: null, tone: '' },
]

export const SummaryCards = ({ totals }) => {
    const { t, formatCurrency } = useAppPreferences()
    const cards = useMemo(
        () =>
            cardMeta.map((card) => ({
                ...card,
                label: t(card.labelKey),
            })),
        [t]
    )

    return (
        <div className="grid gap-4 md:grid-cols-3">
            {cards.map((card) => {
                const value = totals[card.key] || 0
                const formatted =
                    card.sign === null
                        ? formatCurrency(value)
                        : `${card.sign} ${formatCurrency(Math.abs(value))}`
                return (
                    <div
                        key={card.key}
                        className="rounded-2xl border border-muted bg-surface p-4 shadow-sm"
                    >
                        <p className="text-sm text-muted">{card.label}</p>
                        <p
                            className={`mt-2 text-2xl font-semibold ${card.tone}`}
                        >
                            {formatted}
                        </p>
                    </div>
                )
            })}
        </div>
    )
}
