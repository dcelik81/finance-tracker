import { useCallback, useEffect, useState } from 'react'
import { useAppPreferences } from '../contexts/useAppPreferences.js'
import {
    deleteCategory,
    fetchCategories,
    getDatabase,
    insertCategory,
    persistDatabase,
} from '../lib/db'

export const useCategories = () => {
    const { t } = useAppPreferences()
    const [db, setDb] = useState(null)
    const [categories, setCategories] = useState([])
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
                setCategories(fetchCategories(database))
            } catch (err) {
                console.error(err)
                setError(t('errors.categoryLoad'))
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

    const refreshCategories = useCallback(() => {
        if (!db) return
        setCategories(fetchCategories(db))
    }, [db])

    const addCategory = useCallback(
        (payload) => {
            if (!db) return
            try {
                insertCategory(db, payload)
                persistDatabase(db)
                refreshCategories()
            } catch (err) {
                console.error(err)
                setError(t('errors.categoryCreate'))
            }
        },
        [db, refreshCategories, t]
    )

    const removeCategory = useCallback(
        (id) => {
            if (!db) return
            try {
                deleteCategory(db, id)
                persistDatabase(db)
                refreshCategories()
            } catch (err) {
                console.error(err)
                setError(t('errors.categoryDelete'))
            }
        },
        [db, refreshCategories, t]
    )

    return {
        categories,
        loading,
        error,
        addCategory,
        removeCategory,
    }
}
