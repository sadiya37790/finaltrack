// src/pages/AuthPage.js
import React, { useState } from 'react';
import { useAuth } from '../lib/AuthContext';

export default function AuthPage() {
  const { signInWithEmail, signUpWithEmail, signInWithGoogle } = useAuth();
  const [mode, setMode] = useState('login'); // login | signup
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handle = field => e => setForm(f => ({ ...f, [field]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        await signInWithEmail(form.email, form.password);
      } else {
        if (!form.name.trim()) { setError('Please enter your name.'); setLoading(false); return; }
        await signUpWithEmail(form.email, form.password, form.name);
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    }
    setLoading(false);
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logo}><span style={styles.logoAccent}>Final</span>Track</div>
        <p style={styles.tagline}>Your daily placement preparation companion</p>

        <button onClick={signInWithGoogle} style={styles.googleBtn}>
          <svg width="18" height="18" viewBox="0 0 18 18" style={{ marginRight: 8 }}>
            <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z"/>
            <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2.04a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z"/>
            <path fill="#FBBC05" d="M4.5 10.48A4.8 4.8 0 0 1 4.5 7.5V5.43H1.83a8 8 0 0 0 0 7.14L4.5 10.48z"/>
            <path fill="#EA4335" d="M8.98 3.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.44L4.5 7.5c.53-1.6 2-2.32 4.48-2.32z"/>
          </svg>
          Continue with Google
        </button>

        <div style={styles.divider}><span style={styles.dividerText}>or</span></div>

        <form onSubmit={submit}>
          {mode === 'signup' && (
            <input
              style={styles.input}
              type="text"
              placeholder="Your full name"
              value={form.name}
              onChange={handle('name')}
              required
            />
          )}
          <input
            style={styles.input}
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={handle('email')}
            required
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handle('password')}
            required
            minLength={6}
          />
          {error && <div style={styles.error}>{error}</div>}
          <button type="submit" style={styles.submitBtn} disabled={loading}>
            {loading ? 'Please wait...' : mode === 'login' ? 'Log in' : 'Create account'}
          </button>
        </form>

        <p style={styles.switchText}>
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <span style={styles.switchLink} onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); }}>
            {mode === 'login' ? 'Sign up free' : 'Log in'}
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8F7FF', padding: '1rem' },
  card: { background: '#fff', border: '0.5px solid #E0DFEE', borderRadius: 16, padding: '2rem', width: '100%', maxWidth: 400 },
  logo: { fontSize: 24, fontWeight: 600, textAlign: 'center', marginBottom: 6 },
  logoAccent: { color: '#534AB7' },
  tagline: { fontSize: 13, color: '#888', textAlign: 'center', marginBottom: '1.5rem' },
  googleBtn: { width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', border: '0.5px solid #ddd', borderRadius: 8, background: '#fff', cursor: 'pointer', fontSize: 14, fontWeight: 500, marginBottom: '1rem' },
  divider: { position: 'relative', textAlign: 'center', margin: '1rem 0' },
  dividerText: { background: '#fff', padding: '0 12px', fontSize: 12, color: '#aaa', position: 'relative', zIndex: 1 },
  input: { width: '100%', padding: '10px 12px', border: '0.5px solid #ddd', borderRadius: 8, fontSize: 14, marginBottom: 10, outline: 'none', display: 'block' },
  error: { background: '#FCEBEB', color: '#A32D2D', fontSize: 13, padding: '8px 12px', borderRadius: 8, marginBottom: 10 },
  submitBtn: { width: '100%', padding: '10px', background: '#534AB7', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer', marginTop: 4 },
  switchText: { textAlign: 'center', fontSize: 13, color: '#888', marginTop: '1rem' },
  switchLink: { color: '#534AB7', cursor: 'pointer', fontWeight: 500 },
};
