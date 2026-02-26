-- FINAL SQL FIX: Run this to ensure ALL tables have the correct columns

-- PRODUCTS
ALTER TABLE products ADD COLUMN IF NOT EXISTS instock BOOLEAN DEFAULT true;
ALTER TABLE products ADD COLUMN IF NOT EXISTS purchaseurl TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS pdffile TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS status TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS quantity INTEGER DEFAULT 0;
ALTER TABLE products ADD COLUMN IF NOT EXISTS createdat TIMESTAMPTZ DEFAULT NOW();

-- ORDERS
ALTER TABLE orders ADD COLUMN IF NOT EXISTS total NUMERIC;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS totalprice NUMERIC;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS items JSONB;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS date TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS createdat TIMESTAMPTZ DEFAULT NOW();

-- DONATIONS
ALTER TABLE donations ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE donations ADD COLUMN IF NOT EXISTS donor_name TEXT;
ALTER TABLE donations ADD COLUMN IF NOT EXISTS recipient TEXT;
ALTER TABLE donations ADD COLUMN IF NOT EXISTS amount NUMERIC;
ALTER TABLE donations ADD COLUMN IF NOT EXISTS program TEXT;
ALTER TABLE donations ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'Success';
ALTER TABLE donations ADD COLUMN IF NOT EXISTS date TEXT;
ALTER TABLE donations ADD COLUMN IF NOT EXISTS image TEXT;
ALTER TABLE donations ADD COLUMN IF NOT EXISTS description TEXT;

-- DONOR REGISTRATIONS (donations submitted from the Be a Donor page)
CREATE TABLE IF NOT EXISTS donor_registrations (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT,
    phone TEXT,
    city TEXT,
    message TEXT,
    child_id TEXT,
    child_name TEXT,
    child_age INTEGER,
    child_domicile TEXT,
    child_image TEXT,
    amount NUMERIC,
    duration TEXT,
    total_amount NUMERIC,
    submitted_at TIMESTAMPTZ DEFAULT NOW()
);
