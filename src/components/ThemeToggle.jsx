import { Moon, Sun } from 'lucide-react'

export const ThemeToggle = ({ theme, onToggle }) => {
    const label = theme === 'dark' ? <Sun /> : <Moon />

    return (
        <button
            type="button"
            onClick={onToggle}
            className="rounded-xl border border-muted bg-app px-4 py-2 text-sm font-semibold shadow-sm transition hover:bg-surface"
        >
            {label}
        </button>
    )
}
