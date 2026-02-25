import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const USERS_FILE = path.join(process.cwd(), 'src/data/users.json');

export async function POST(request) {
    try {
        const { name, email, password } = await request.json();

        // Read existing users
        const fileContent = fs.readFileSync(USERS_FILE, 'utf8');
        const users = JSON.parse(fileContent);

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
        fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

        // Return user without password
        const { password: _, ...userWithoutPassword } = newUser;
        return NextResponse.json({ success: true, user: userWithoutPassword });
    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
    }
}
