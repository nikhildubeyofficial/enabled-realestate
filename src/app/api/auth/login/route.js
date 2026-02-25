import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const USERS_FILE = path.join(process.cwd(), 'src/data/users.json');

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        // Read users
        const fileContent = fs.readFileSync(USERS_FILE, 'utf8');
        const users = JSON.parse(fileContent);

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
