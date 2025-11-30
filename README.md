# Personal Finance Tracker

A modern, privacy-focused expense tracking application built with React. All data is stored locally in your browser using SQLite (via sql.js) — no server, no account required.

## Features

- **Income & Expense Tracking** — Log transactions with categories, amounts, dates, and notes
- **Dashboard Overview** — View total income, expenses, and net balance at a glance
- **Date Filtering** — Filter summary totals by date range
- **Custom Categories** — Create and manage your own income/expense categories
- **Multi-language Support** — English and Turkish translations included
- **Multi-currency Display** — Format amounts in TRY, USD, or EUR
- **Dark/Light Theme** — Toggle between themes with automatic system preference detection
- **Offline-first** — Works entirely in the browser with SQLite persistence via localStorage

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 19 |
| Build Tool | Vite 7 |
| Styling | Tailwind CSS 4 |
| Routing | React Router 7 |
| Database | SQLite (sql.js WebAssembly) |
| Icons | Lucide React |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ or [Bun](https://bun.sh/)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd expense-tracker

# Install dependencies
bun install
# or
npm install

# Start development server
bun dev
# or
npm run dev
```

The app will be available at `http://localhost:5173`

### Available Scripts

| Command | Description |
|---------|-------------|
| `bun dev` | Start development server with HMR |
| `bun build` | Build for production |
| `bun preview` | Preview production build locally |
| `bun lint` | Run ESLint |
| `bun format` | Format code with Prettier |

## Project Structure

```
src/
├── main.jsx                 # Application entry point
├── App.jsx                  # Root component with theme/language controls
├── index.css                # Global styles and Tailwind imports
│
├── components/              # Reusable UI components
│   ├── CategoryManager.jsx  # Category CRUD panel (collapsible)
│   ├── EntryForm.jsx        # Form for adding income/expense entries
│   ├── EntryTable.jsx       # Table displaying all entries
│   ├── SummaryCards.jsx     # Dashboard cards showing totals
│   └── ThemeToggle.jsx      # Dark/light mode toggle button
│
├── contexts/                # React Context providers
│   ├── AppPreferences.jsx   # Provider for language, currency, theme
│   ├── AppPreferencesContext.js  # Context object
│   ├── appPreferencesConfig.js   # Configuration constants
│   ├── translations.js      # i18n translation strings
│   └── useAppPreferences.js # Hook to consume preferences context
│
├── hooks/                   # Custom React hooks
│   ├── useCategories.js     # Category state management
│   └── useEntries.js        # Entry state management with totals
│
├── lib/                     # Utilities and services
│   └── db.js                # SQLite database initialization & queries
│
└── pages/                   # Page components
    └── TrackerPage.jsx      # Main tracker page with all sections
```

## Documentation

### Database (`src/lib/db.js`)

The app uses **sql.js**, a WebAssembly port of SQLite, to store data directly in the browser's localStorage.

#### Schema

**entries** table:
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key, auto-increment |
| type | TEXT | `'income'` or `'expense'` |
| category | TEXT | Category name |
| amount | REAL | Transaction amount |
| date | TEXT | ISO date string (YYYY-MM-DD) |
| notes | TEXT | Optional notes |

**categories** table:
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key, auto-increment |
| name | TEXT | Category name |
| type | TEXT | `'income'` or `'expense'` |

#### Key Functions

```javascript
import { getDatabase, persistDatabase, fetchEntries, fetchCategories } from './lib/db'

// Initialize database (async, returns singleton)
const db = await getDatabase()

// Fetch all entries
const entries = fetchEntries(db)

// Persist changes to localStorage
persistDatabase(db)
```

### Hooks

#### `useEntries()`

Manages expense/income entries with automatic total calculation.

```javascript
const { entries, totals, loading, error, addEntry, removeEntry } = useEntries()

// totals = { income: number, expense: number, net: number }
```

#### `useCategories()`

Manages custom categories.

```javascript
const { categories, loading, error, addCategory, removeCategory } = useCategories()
```

### Context (`useAppPreferences`)

Provides internationalization and formatting utilities.

```javascript
const { 
  language,           // Current language code ('en' | 'tr')
  setLanguage,        // Change language
  currency,           // Current currency code ('TRY' | 'USD' | 'EUR')
  setCurrency,        // Change currency
  t,                  // Translation function: t('section.key')
  formatCurrency,     // Format number as currency: formatCurrency(100)
  languageOptions,    // Available languages
  currencyOptions,    // Available currencies
} = useAppPreferences()
```

### Adding Translations

Edit `src/contexts/translations.js` to add or modify translation strings:

```javascript
export const translations = {
  en: {
    mySection: {
      myKey: 'English text',
    },
  },
  tr: {
    mySection: {
      myKey: 'Turkish text',
    },
  },
}
```

Then use in components:

```jsx
const { t } = useAppPreferences()
return <p>{t('mySection.myKey')}</p>
```

### Components

#### `<SummaryCards totals={totals} />`

Displays three cards: Total Income, Total Expense, and Net Difference.

#### `<EntryForm onSubmit={addEntry} categories={categories} />`

Form for creating new entries. Validates amount, category, and date before submission.

#### `<EntryTable entries={entries} onDelete={removeEntry} />`

Sortable table displaying all entries with delete functionality.

#### `<CategoryManager categories={categories} onCreate={addCategory} onDelete={removeCategory} />`

Collapsible panel for managing custom categories. Grouped by income/expense type.

#### `<ThemeToggle theme={theme} onToggle={toggleTheme} />`

Button to switch between light and dark themes.

## Data Storage

All data is stored in your browser's localStorage under the key `expense-tracker-sqlite`. To reset all data, clear this key from your browser's developer tools:

```javascript
localStorage.removeItem('expense-tracker-sqlite')
```

Then refresh the page.

## License

MIT
