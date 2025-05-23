'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg('');
    try {
      const res = await fetch('http://localhost:4000/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');

      // Store token locally (or in a secure cookie if you prefer)
      localStorage.setItem('token', data.token);

      // Optional: store user name or email if needed
      localStorage.setItem('user', JSON.stringify(data.user));

      setMsg('✅ Login successful! Redirecting...');
      setTimeout(() => {
        router.push('/'); // or /dashboard or your landing page
      }, 1000);
    } catch (err: any) {
      setMsg(`❌ ${err.message}`);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-offwhite p-6">
      <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4 rounded border p-6 shadow">
        <h1 className="text-center text-2xl font-bold text-charcoal">Log In</h1>

        <input
          className="w-full rounded border p-2"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          className="w-full rounded border p-2"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button
          type="submit"
          className="w-full rounded bg-pink py-2 font-medium text-white hover:bg-pink/90"
        >
          Log In
        </button>

        {msg && <p className="text-center text-sm">{msg}</p>}
      </form>
    </main>
  );
}
