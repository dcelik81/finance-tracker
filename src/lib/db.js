import initSqlJs from 'sql.js'
import wasmURL from 'sql.js/dist/sql-wasm.wasm?url'

const DB_STORAGE_KEY = 'expense-tracker-sqlite'
const DEFAULT_CATEGORIES = [
    { name: 'Allowance', type: 'income' },
    { name: 'Food & Beverage', type: 'expense' },
    { name: 'Salary', type: 'income' },
    { name: 'Rent', type: 'expense' },
    { name: 'Groceries', type: 'expense' },
    { name: 'Transport', type: 'expense' },
]

let dbPromise

const ensureClient = () => {
    if (typeof window === 'undefined') {
        throw new Error('Database is only available in the browser')
    }
}

const uint8ToBase64 = (bytes) => {
    let binary = ''
    const chunkSize = 0x8000
    for (let i = 0; i < bytes.length; i += chunkSize) {
        binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize))
    }
    return btoa(binary)
}

const base64ToUint8 = (base64) => {
    const binary = atob(base64)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i += 1) {
        bytes[i] = binary.charCodeAt(i)
    }
    return bytes
}

export const getDatabase = () => {
    ensureClient()

    if (!dbPromise) {
        dbPromise = (async () => {
            const SQL = await initSqlJs({ locateFile: () => wasmURL })
            const stored = window.localStorage.getItem(DB_STORAGE_KEY)
            const db = stored
                ? new SQL.Database(base64ToUint8(stored))
                : new SQL.Database()

            db.run(`
        CREATE TABLE IF NOT EXISTS entries (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          type TEXT NOT NULL CHECK (type IN ('income','expense')),
          category TEXT NOT NULL,
          amount REAL NOT NULL,
          date TEXT NOT NULL,
          notes TEXT
        )
      `)

            db.run(`
        CREATE TABLE IF NOT EXISTS categories (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          type TEXT NOT NULL CHECK (type IN ('income','expense')),
          UNIQUE(name, type)
        )
      `)

            seedCategories(db)

            return db
        })()
    }

    return dbPromise
}

export const persistDatabase = (db) => {
    ensureClient()
    const data = db.export()
    const base64 = uint8ToBase64(data)
    window.localStorage.setItem(DB_STORAGE_KEY, base64)
}

export const fetchEntries = (db) => {
    const stmt = db.prepare(`
    SELECT id, type, category, amount, date, COALESCE(notes, '') as notes
    FROM entries
    ORDER BY date DESC, id DESC
  `)

    const rows = []
    while (stmt.step()) {
        rows.push(stmt.getAsObject())
    }
    stmt.free()
    return rows
}

const seedCategories = (db) => {
    const stmt = db.prepare(`SELECT COUNT(*) as count FROM categories`)
    stmt.step()
    const { count } = stmt.getAsObject()
    stmt.free()
    if (count > 0) return

    const insert = db.prepare(
        `INSERT INTO categories (name, type) VALUES (?, ?)`
    )
    DEFAULT_CATEGORIES.forEach((category) => {
        insert.run([category.name, category.type])
    })
    insert.free()
}

export const fetchCategories = (db) => {
    const stmt = db.prepare(`
    SELECT id, name, type
    FROM categories
    ORDER BY type ASC, name ASC
  `)
    const rows = []
    while (stmt.step()) {
        rows.push(stmt.getAsObject())
    }
    stmt.free()
    return rows
}

export const insertCategory = (db, { name, type }) => {
    const stmt = db.prepare(`INSERT INTO categories (name, type) VALUES (?, ?)`)
    stmt.run([name.trim(), type])
    stmt.free()
}

export const deleteCategory = (db, id) => {
    const stmt = db.prepare(`DELETE FROM categories WHERE id = ?`)
    stmt.run([id])
    stmt.free()
}
