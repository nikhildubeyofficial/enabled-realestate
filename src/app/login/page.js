'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [errorMsg, setErrorMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = (e) => {
        e.preventDefault();
        // Firebase login logic omitted
        router.push('/');
    };

    const handleGoogleLogin = () => {
        // Google popup login omitted
        router.push('/');
    };

    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-200px)] bg-gray-50 font-inter">
            <div className="w-full max-w-sm p-6 border border-gray-300 rounded-lg bg-white sm:shadow-sm">
                <h2 className="text-center text-2xl font-semibold mb-6">Log In</h2>
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="email" className="text-sm text-gray-600 block">
                            Email <span className="text-red-400 text-md">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            name="email"
                            className="w-full p-3 mt-1 rounded bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="text-sm text-gray-600 block">
                            Password <span className="text-red-400 text-md">*</span>
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            name="password"
                            className="w-full p-3 mt-1 rounded bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-2.5 bg-[#3455b9] text-white rounded hover:bg-blue-800 transition disabled:opacity-60"
                    >
                        {isLoading ? "Logging in..." : "Log In"}
                    </button>
                </form>
                {errorMsg && (
                    <p className="text-red-500 text-center mt-4 text-sm font-medium">{errorMsg}</p>
                )}
                <div className="text-center mt-5">
                    <p className="mb-4 text-gray-600">or Log in with</p>
                    <button
                        onClick={handleGoogleLogin}
                        disabled={isLoading}
                        className="w-full bg-[#db4444] text-white py-2 rounded hover:bg-red-600 transition"
                    >
                        Login with Google
                    </button>
                </div>
                <p className="text-center mt-6 text-sm">
                    Don't have an account?{" "}
                    <Link href="/signup" className="text-blue-500 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}
