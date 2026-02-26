/**
 * Run this script to seed your Supabase tables with data from your local JSON files.
 * Usage: node src/scripts/seed-supabase.js
 * 
 * Make sure to set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const DATA_FILES = [
    { file: 'users.json', table: 'users' },
    { file: 'products.json', table: 'products' },
    { file: 'orders.json', table: 'orders' },
    { file: 'donations.json', table: 'donations' }
];

async function seed() {
    console.log('🚀 Starting Supabase Seeding...');

    for (const item of DATA_FILES) {
        const filePath = path.join(process.cwd(), 'src/data', item.file);
        if (!fs.existsSync(filePath)) {
            console.warn(`⚠️  Skip: ${item.file} not found.`);
            continue;
        }

        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        if (!data || data.length === 0) {
            console.warn(`⚠️  Skip: ${item.file} is empty.`);
            continue;
        }

        console.log(`📦 Seeding ${item.table} (${data.length} records)...`);

        // Upsert data to Supabase
        const { error } = await supabase.from(item.table).upsert(data);

        if (error) {
            console.error(`❌ Error seeding ${item.table}:`, error.message);
        } else {
            console.log(`✅ ${item.table} seeded successfully.`);
        }
    }

    console.log('✨ Seeding completion.');
}

seed();
