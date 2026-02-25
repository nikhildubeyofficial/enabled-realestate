'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = (e) => {
        e.preventDefault();
        setErrorMsg("");

        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            setErrorMsg("Please fill in all fields");
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setErrorMsg("Passwords do not match");
            return;
        }

        setIsLoading(true);
        // Firebase Auth signup omitted
        setSuccessMsg("Account created successfully!");
        setTimeout(() => {
            router.push('/login');
        }, 1500);
    };

    const handleGoogleSignup = () => {
        setIsLoading(true);
        // Google signup omitted
        setSuccessMsg("Signed up with Google!");
        setTimeout(() => {
            router.push('/');
        }, 1500);
    };

    return (
        <div className="min-h-[calc(100vh-200px)] flex justify-center items-start font-inter bg-gray-50 pb-10">
            <div className="max-w-md w-full mx-auto p-6 bg-white shadow-lg rounded-xl mt-8">
                <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

                {errorMsg && <p className="text-red-500 mb-2">{errorMsg}</p>}
                {successMsg && <p className="text-green-600 mb-2">{successMsg}</p>}

                <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="text-sm text-[#999099] block mb-1">
                            Name <span className="text-[#f1b4b4] text-md">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full p-3 rounded bg-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="text-sm text-[#999099] block mb-1">
                            Email <span className="text-[#f1b4b4] text-md">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full p-3 rounded bg-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="text-sm text-[#999099] block mb-1">
                            Password <span className="text-[#f1b4b4] text-md">*</span>
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full p-3 rounded bg-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="text-sm text-[#999099] block mb-1">
                            Confirm Password <span className="text-[#f1b4b4] text-md">*</span>
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="w-full p-3 rounded bg-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[#3455b9] text-white p-2 rounded hover:bg-blue-800 disabled:opacity-60 transition"
                    >
                        {isLoading ? "Waiting..." : "Sign Up"}
                    </button>
                </form>

                <br className="my-4" />

                <button
                    onClick={handleGoogleSignup}
                    className="w-full bg-[#db4444] text-white p-2 rounded hover:bg-red-600 transition"
                    disabled={isLoading}
                >
                    Sign Up with Google
                </button>

                <p className="text-center mt-6 text-sm">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
