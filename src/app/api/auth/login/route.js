import { NextResponse } from 'next/server';
import { getUsers } from '@/lib/db';

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        // Read users
        const users = await getUsers();

        // Find user
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            return NextResponse.json({ success: false, message: 'Invalid email or password' }, { status: 401 });
        }

        // Return user without password
        const { password: _, ...userWithoutPassword } = user;
        return NextResponse.json({ success: true, user: userWithoutPassword });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
    }
}
