export const LANGUAGE_KEY = 'expense-tracker-language'
export const CURRENCY_KEY = 'expense-tracker-currency'

export const locales = {
    en: 'en-US',
    tr: 'tr-TR',
}

export const languageOptions = [
    { code: 'en', label: 'English' },
    { code: 'tr', label: 'Türkçe' },
]

export const currencyOptions = [
    { code: 'TRY', label: '₺ TRY' },
    { code: 'USD', label: '$ USD' },
    { code: 'EUR', label: '€ EUR' },
]

export const translations = {
    en: {
        nav: {
            tracker: 'Tracker',
            guide: 'SQLite guide',
        },
        header: {
            subtitle: 'Personal finance',
            title: 'Expense Tracker',
        },
        sections: {
            overview: 'Overview',
            quickEntry: 'Quick Entry',
            allEntries: 'All Entries',
        },
        tracker: {
            loading: 'Loading data...',
        },
        summary: {
            income: 'Total Income',
            expense: 'Total Expense',
            net: 'Difference',
        },
        dateFilter: {
            startDate: 'Start Date',
            endDate: 'End Date',
        },
        form: {
            entryType: 'Entry Type',
            typeIncome: 'Income',
            typeExpense: 'Expense',
            amount: 'Amount',
            category: 'Category',
            date: 'Date',
            notes: 'Notes (optional)',
            notesPlaceholder: 'Add context that helps you remember this entry',
            categoryPlaceholder: 'e.g. Rent, Groceries',
            submit: 'Save Entry',
            errors: {
                amount: 'Add a positive amount',
                category: 'Category is required',
                date: 'Select a date',
            },
        },
        table: {
            empty: 'No entries yet. Add your first income or expense above.',
            headers: {
                type: 'Type',
                category: 'Category',
                amount: 'Amount',
                date: 'Date',
                notes: 'Notes',
                actions: 'Actions',
            },
            delete: 'Delete',
        },
        guide: {
            title: 'SQLite Setup (Browser)',
            description:
                'This project uses the sql.js package so you can work with a real SQLite engine inside the browser—no native binaries required.',
            steps: [
                'Install the SQLite WebAssembly build with `bun add sql.js`.',
                'Import the helper in `src/lib/db.js` and call `getDatabase()` when the app boots.',
                'Use the returned database instance to run SQL (for example `CREATE TABLE ...`).',
                'Persist the database by exporting the bytes and saving them to localStorage.',
                'Reload the bytes on the next visit to keep the same SQLite data inside the browser.',
            ],
            tipIntro:
                'You can inspect or reset the data by clearing the localStorage key named',
            storageKey: 'expense-tracker-sqlite',
        },
        footer: {
            note: 'Data is stored locally via SQLite + sql.js',
        },
        controls: {
            theme: {
                light: 'Light mode',
                dark: 'Dark mode',
            },
            language: 'Language',
            currency: 'Currency',
        },
        errors: {
            dbInit: 'Unable to initialize database. Refresh the page and try again.',
            save: 'Unable to save entry. Please retry.',
            delete: 'Unable to delete entry.',
            categoryLoad: 'Unable to load categories.',
            categoryCreate: 'Unable to create category. Try a different name.',
            categoryDelete: 'Unable to remove category.',
        },
        categoryPanel: {
            title: 'Categories',
            formTitle: 'Create a category',
            inputLabel: 'Name',
            placeholder: 'e.g. Transport',
            typeLabel: 'Entry type',
            submit: 'Add category',
            listTitle: 'Saved categories',
            empty: 'No categories yet. Add one to get started.',
            remove: 'Remove',
        },
    },
    tr: {
        nav: {
            tracker: 'Takip',
            guide: 'SQLite rehberi',
        },
        header: {
            subtitle: 'Kişisel finans',
            title: 'Gider Takibi',
        },
        sections: {
            overview: 'Genel Bakış',
            quickEntry: 'Hızlı Kayıt',
            allEntries: 'Tüm Kayıtlar',
        },
        tracker: {
            loading: 'Veriler yükleniyor...',
        },
        summary: {
            income: 'Toplam Gelir',
            expense: 'Toplam Gider',
            net: 'Fark',
        },
        dateFilter: {
            startDate: 'Başlangıç Tarihi',
            endDate: 'Bitiş Tarihi',
        },
        form: {
            entryType: 'Kayıt türü',
            typeIncome: 'Gelir',
            typeExpense: 'Gider',
            amount: 'Tutar',
            category: 'Kategori',
            date: 'Tarih',
            notes: 'Notlar (opsiyonel)',
            notesPlaceholder: 'Bu kaydı hatırlatacak kısa bir not yazın',
            categoryPlaceholder: 'örn. Kira, Market',
            submit: 'Kaydı kaydet',
            errors: {
                amount: 'Pozitif bir tutar girin',
                category: 'Kategori zorunludur',
                date: 'Bir tarih seçin',
            },
        },
        table: {
            empty: 'Henüz kayıt yok. İlk gelir veya giderinizi yukarıdan ekleyin.',
            headers: {
                type: 'Tür',
                category: 'Kategori',
                amount: 'Tutar',
                date: 'Tarih',
                notes: 'Notlar',
                actions: 'İşlemler',
            },
            delete: 'Sil',
        },
        guide: {
            title: 'SQLite Kurulumu (Tarayıcı)',
            description:
                'Bu proje, tarayıcı içinde gerçek bir SQLite motoru kullanabilmeniz için sql.js paketine dayanır; ekstra kurulum gerekmez.',
            steps: [
                '`bun add sql.js` komutu ile SQLite WebAssembly paketini yükleyin.',
                '`src/lib/db.js` içindeki yardımcıyı içe aktarın ve uygulama açılırken `getDatabase()` çağırın.',
                'Döndürülen veritabanı örneği ile SQL komutlarını çalıştırın (örn. `CREATE TABLE ...`).',
                'Veritabanını dışa aktararak localStorage içine kaydedin.',
                'Bir sonraki ziyarette aynı SQLite verisini tarayıcıda yeniden yükleyin.',
            ],
            tipIntro:
                'Verileri, adını taşıyan localStorage anahtarını temizleyerek sıfırlayabilirsiniz:',
            storageKey: 'expense-tracker-sqlite',
        },
        footer: {
            note: 'Veriler SQLite + sql.js ile yerel olarak saklanır',
        },
        controls: {
            theme: {
                light: 'Aydınlık mod',
                dark: 'Karanlık mod',
            },
            language: 'Dil',
            currency: 'Para birimi',
        },
        errors: {
            dbInit: 'Veritabanı başlatılamadı. Lütfen sayfayı yenileyin.',
            save: 'Kayıt kaydedilemedi. Lütfen tekrar deneyin.',
            delete: 'Kayıt silinemedi.',
            categoryLoad: 'Kategoriler yüklenemedi.',
            categoryCreate: 'Kategori oluşturulamadı. Farklı bir isim deneyin.',
            categoryDelete: 'Kategori silinemedi.',
        },
        categoryPanel: {
            title: 'Kategoriler',
            formTitle: 'Kategori oluştur',
            inputLabel: 'Adı',
            placeholder: 'örn. Ulaşım',
            typeLabel: 'Kayıt türü',
            submit: 'Kategori ekle',
            listTitle: 'Kayıtlı kategoriler',
            empty: 'Henüz kategori yok. Başlamak için bir tane ekleyin.',
            remove: 'Sil',
        },
    },
}
