
'use client';                     // <-- must be first line when you use hooks

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // <-- NEW import ( login page)

export default function SignupPage() {   // <-- default export + returns JSX
  const [form, setForm]   = useState({ name: '', email: '', password: '' });
  const [msg,  setMsg]    = useState('');
  const router = useRouter(); // <-- NEW (login)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg('');                         // clear any old message
    try {
      const res = await fetch('http://localhost:4000/users/signup', {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Signup failed');

      setMsg(`🎉 Welcome, ${data.user.name}!`);
      // ✅ Save token and user info to localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      // ✅ Redirect to dashboard
      router.push('/'); // <-- Change this to wherever you want to send the user
    } catch (err: any) {
      setMsg(`❌ ${err.message}`);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-offwhite p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 rounded border p-6 shadow">
        <h1 className="text-center text-2xl font-bold text-charcoal">Sign Up</h1>

        <input
          className="w-full rounded border p-2"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
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
          minLength={6}
        />

        <button
          type="submit"
          className="w-full rounded bg-pink py-2 font-medium text-white hover:bg-pink/90"
        >
          Sign Up
        </button>

        {msg && <p className="text-center text-sm">{msg}</p>}
      </form>
    </main>
  );
}
