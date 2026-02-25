export async function GET() {
    try {
        const res = await fetch('https://enabled-backend.onrender.com/api/products', {
            cache: 'no-store',
        });
        if (!res.ok) {
            return new Response(JSON.stringify({ error: 'Failed to fetch products' }), {
                status: res.status,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        const data = await res.json();
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
