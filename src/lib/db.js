import fs from 'fs';
import path from 'path';
import { supabase } from './supabase';

const DATA_DIR = path.join(process.cwd(), 'src/data');

const getFilePath = (filename) => path.join(DATA_DIR, filename);

// Supabase helper: Maps JSON filenames to table names
const TABLE_MAP = {
    'users.json': 'users',
    'products.json': 'products',
    'orders.json': 'orders',
    'donations.json': 'donations'
};

export async function readData(filename) {
    // If Supabase is configured, use it
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        const table = TABLE_MAP[filename];
        if (table) {
            try {
                const { data, error } = await supabase.from(table).select('*');
                if (error) throw error;
                return data || [];
            } catch (err) {
                console.error(`Supabase read error for ${table}:`, err);
                // Fallback to JSON if Supabase fails (optional)
            }
        }
    }

    try {
        const filePath = getFilePath(filename);
        if (!fs.existsSync(filePath)) {
            return [];
        }
        const content = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(content || '[]');
    } catch (error) {
        console.error(`Error reading ${filename}:`, error);
        return [];
    }
}

export async function writeData(filename, data) {
    // If Supabase is configured, use it
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        const table = TABLE_MAP[filename];
        if (table) {
            try {
                // For simplicity, we assume 'upsert' works if data has unique IDs
                // In a real app, you'd handle specific logic for users vs orders
                const { error } = await supabase.from(table).upsert(data);
                if (error) throw error;
                return true;
            } catch (err) {
                console.error(`Supabase write error for ${table}:`, err);
            }
        }
    }

    try {
        const filePath = getFilePath(filename);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error(`Error writing ${filename}:`, error);
        return false;
    }
}

// Specialized helpers
export const getProducts = () => readData('products.json');
export const saveProducts = (data) => writeData('products.json', data);

export const getDonations = () => readData('donations.json');
export const saveDonations = (data) => writeData('donations.json', data);

export const getOrders = () => readData('orders.json');
export const saveOrders = (data) => writeData('orders.json', data);

export const getUsers = () => readData('users.json');
export const saveUsers = (data) => writeData('users.json', data);
