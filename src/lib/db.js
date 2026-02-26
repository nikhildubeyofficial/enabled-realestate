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

// Mapping helpers for Supabase (CamelCase to lowercase)
const FIELD_MAPPINGS = {
    'products': {
        from: (item) => ({
            ...item,
            purchaseUrl: item.purchaseurl,
            pdfFile: item.pdffile,
            inStock: item.instock
        }),
        to: (item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            description: item.description,
            image: item.image,
            category: item.category,
            purchaseurl: item.purchaseUrl,
            pdffile: item.pdfFile,
            features: item.features,
            quantity: item.quantity,
            status: item.status,
            instock: item.inStock
        })
    },
    'orders': {
        from: (item) => ({
            ...item,
            totalPrice: item.totalprice,
            createdAt: item.createdat
        }),
        to: (item) => ({
            id: item.id,
            customer: item.customer,
            email: item.email,
            total: item.total,
            totalprice: item.totalPrice,
            status: item.status,
            address: item.address,
            products: item.products,
            items: item.items,
            date: item.date,
            createdat: item.createdAt || new Date().toISOString()
        })
    },
    'donations': {
        from: (item) => item,
        to: (item) => ({
            id: item.id,
            donor_name: item.donor_name || item.title,
            title: item.title || item.donor_name,
            recipient: item.recipient,
            amount: item.amount,
            program: item.program,
            status: item.status,
            date: item.date,
            image: item.image,
            description: item.description
        })
    }
};

export async function readData(filename) {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        const table = TABLE_MAP[filename];
        if (table) {
            try {
                const { data, error } = await supabase.from(table).select('*');
                if (error) throw error;

                // Map from Supabase lowercase to CamelCase
                if (FIELD_MAPPINGS[table]) {
                    return data.map(FIELD_MAPPINGS[table].from);
                }
                return data || [];
            } catch (err) {
                console.error(`Supabase read error for ${table}:`, err);
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
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        const table = TABLE_MAP[filename];
        if (table) {
            try {
                let mappedData = Array.isArray(data) ? data : [data];

                // Map to Supabase lowercase
                if (FIELD_MAPPINGS[table]) {
                    mappedData = mappedData.map(FIELD_MAPPINGS[table].to);
                }

                const { error } = await supabase.from(table).upsert(mappedData);
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
