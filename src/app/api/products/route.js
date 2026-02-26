import { getProducts } from '@/lib/db';

let cachedProducts = null;
let cacheTime = 0;
const CACHE_TTL_MS = 2 * 60 * 1000; // 2 minutes

export async function GET() {
    try {
        const now = Date.now();
        if (cachedProducts !== null && now - cacheTime < CACHE_TTL_MS) {
            return new Response(JSON.stringify(cachedProducts), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
                },
            });
        }
        const products = await getProducts();
        cachedProducts = products;
        cacheTime = now;
        return new Response(JSON.stringify(products), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
            },
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
