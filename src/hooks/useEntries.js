import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAppPreferences } from '../contexts/useAppPreferences.js'
import { fetchEntries, getDatabase, persistDatabase } from '../lib/db'

const initialTotals = { income: 0, expense: 0, net: 0 }

const toNumber = (value) => {
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : 0
}

export const useEntries = () => {
    const { t } = useAppPreferences()
    const [db, setDb] = useState(null)
    const [entries, setEntries] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        let cancelled = false

        const boot = async () => {
            setLoading(true)
            try {
                const database = await getDatabase()
                if (cancelled) return
                setDb(database)
                setEntries(fetchEntries(database))
            } catch (err) {
                console.error(err)
                setError(t('errors.dbInit'))
            } finally {
                if (!cancelled) {
                    setLoading(false)
                }
            }
        }

        boot()

        return () => {
            cancelled = true
        }
    }, [t])

    const refreshEntries = useCallback(() => {
        if (!db) return
        setEntries(fetchEntries(db))
    }, [db])

    const addEntry = useCallback(
        (payload) => {
            if (!db) return
            try {
                const stmt = db.prepare(`
          INSERT INTO entries (type, category, amount, date, notes)
          VALUES (?, ?, ?, ?, ?)
        `)
                stmt.run([
                    payload.type,
                    payload.category.trim(),
                    toNumber(payload.amount),
                    payload.date,
                    payload.notes?.trim() || null,
                ])
                stmt.free()
                persistDatabase(db)
                refreshEntries()
            } catch (err) {
                console.error(err)
                setError(t('errors.save'))
            }
        },
        [db, refreshEntries, t]
    )

    const removeEntry = useCallback(
        (id) => {
            if (!db) return
            try {
                const stmt = db.prepare(`DELETE FROM entries WHERE id = ?`)
                stmt.run([id])
                stmt.free()
                persistDatabase(db)
                refreshEntries()
            } catch (err) {
                console.error(err)
                setError(t('errors.delete'))
            }
        },
        [db, refreshEntries, t]
    )

    const totals = useMemo(() => {
        if (!entries.length) return initialTotals
        return entries.reduce(
            (acc, entry) => {
                if (entry.type === 'income') {
                    acc.income += entry.amount
                } else {
                    acc.expense += entry.amount
                }
                acc.net = acc.income - acc.expense
                return acc
            },
            { ...initialTotals }
        )
    }, [entries])

    return {
        entries,
        totals,
        loading,
        error,
        addEntry,
        removeEntry,
    }
}
