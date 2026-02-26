import { NextResponse } from 'next/server';
import { getUsers, saveUsers } from '@/lib/db';

export async function POST(request) {
    try {
        const { name, email, password } = await request.json();

        // Read existing users
        const users = await getUsers();

        // Check if user already exists
        if (users.find(u => u.email === email)) {
            return NextResponse.json({ success: false, message: 'Email already in use' }, { status: 400 });
        }

        // Add new user
        const newUser = {
            id: `u-${Date.now()}`,
            name,
            email,
            password, // In a real app, this should be hashed
            role: 'user'
        };

        users.push(newUser);
        await saveUsers(users);

        // Return user without password
        const { password: _, ...userWithoutPassword } = newUser;
        return NextResponse.json({ success: true, user: userWithoutPassword });
    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
    }
}
