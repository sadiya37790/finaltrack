// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useAuth } from '../lib/AuthContext';
import { supabase } from '../lib/supabase';
import { getTodayContent } from '../lib/dailyContent';
import DSAModule from '../components/DSAModule';
import QuantModule from '../components/QuantModule';
import WritingModule from '../components/WritingModule';

export default function Dashboard() {
  const { user, profile, signOut, updateProfile } = useAuth();
  const { todayProblems, todayModule, todayPrompt, todayQuote } = getTodayContent();

  const [progress, setProgress] = useState(null);
  const [completedModules, setCompletedModules] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [lcUsername, setLcUsername] = useState('');
  const [savingLc, setSavingLc] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (user) loadProgress();
    if (profile?.leetcode_username) setLcUsername(profile.leetcode_username);
  }, [user, profile]);

  async function loadProgress() {
    const { data } = await supabase
      .from('daily_progress')
      .select('*')
      .eq('user_id', user.id)
      .eq('date', today)
      .single();

    if (data) {
      setProgress(data);
    } else {
      // Create today's row
      const { data: newRow } = await supabase
        .from('daily_progress')
        .insert({ user_id: user.id, date: today, quant_module: todayModule.id })
        .select()
        .single();
      setProgress(newRow);
    }

    // Load completed quant modules (all time for this user)
    const { data: allProgress } = await supabase
      .from('daily_progress')
      .select('quant_module')
      .eq('user_id', user.id)
      .eq('quant_done', true);

    if (allProgress) {
      setCompletedModules([...new Set(allProgress.map(p => p.quant_module))]);
    }
  }

  async function handleQuantComplete() {
    await supabase.from('daily_progress')
      .update({ quant_done: true, quant_module: todayModule.id })
      .eq('user_id', user.id).eq('date', today);
    setProgress(p => ({ ...p, quant_done: true }));
    setCompletedModules(prev => [...new Set([...prev, todayModule.id])]);
  }

  async function handleWritingSubmit(text) {
    const words = text.trim().split(/\s+/).length;
    await supabase.from('daily_progress')
      .update({ writing_submitted: true, writing_words: words })
      .eq('user_id', user.id).eq('date', today);
    setProgress(p => ({ ...p, writing_submitted: true, writing_words: words }));
  }

  async function saveLeetCodeUsername() {
    setSavingLc(true);
    await updateProfile({ leetcode_username: lcUsername.trim() });
    setSavingLc(false);
    setShowSettings(false);
  }

  // Stats
  const streak = profile?.streak || 0;
  const dsaVerifiedCount = progress?.dsa_verified || 0;
  const quantDone = progress?.quant_done || false;
  const writingDone = progress?.writing_submitted || false;
  const totalDone = dsaVerifiedCount + (quantDone ? 1 : 0) + (writingDone ? 1 : 0);
  const totalTasks = 5; // 3 dsa + 1 quant + 1 writing

  const placementDate = new Date(new Date().getFullYear(), 10, 15);
  const daysLeft = Math.max(0, Math.ceil((placementDate - new Date()) / 86400000));

  const firstName = profile?.name?.split(' ')[0] || 'there';
  const dateStr = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <div style={styles.page}>
      {/* Top bar */}
      <div style={styles.topbar}>
        <div style={styles.logo}><span style={styles.logoAccent}>Final</span>Track</div>
        <div style={styles.navRight}>
          <button onClick={() => setShowSettings(!showSettings)} style={styles.navBtn}>
            ⚙ Settings
          </button>
          <button onClick={signOut} style={styles.navBtn}>Sign out</button>
        </div>
      </div>

      {/* Settings panel */}
      {showSettings && (
        <div style={styles.settingsPanel}>
          <div style={styles.settingsTitle}>Settings</div>
          <div style={styles.settingsRow}>
            <label style={styles.settingsLabel}>LeetCode username</label>
            <div style={styles.settingsInputRow}>
              <input
                style={styles.settingsInput}
                value={lcUsername}
                onChange={e => setLcUsername(e.target.value)}
                placeholder="e.g. sadiya123"
              />
              <button onClick={saveLeetCodeUsername} style={styles.saveBtn} disabled={savingLc}>
                {savingLc ? 'Saving...' : 'Save'}
              </button>
            </div>
            <div style={styles.settingsHint}>
              Your username is used to auto-verify LeetCode submissions. We only read public data.
            </div>
          </div>
        </div>
      )}

      {/* Greeting */}
      <div style={styles.greeting}>Good {getTimeOfDay()}, {firstName}!</div>
      <div style={styles.date}>{dateStr}</div>

      {/* Stat cards */}
      <div style={styles.statsGrid}>
        <div style={styles.stat}>
          <div style={styles.statLabel}>🔥 Streak</div>
          <div style={styles.statVal}>{streak} <span style={styles.statSub}>days</span></div>
        </div>
        <div style={styles.stat}>
          <div style={styles.statLabel}>✓ Today</div>
          <div style={styles.statVal}>{totalDone} <span style={styles.statSub}>/ {totalTasks}</span></div>
        </div>
        <div style={styles.stat}>
          <div style={styles.statLabel}>📅 Placement</div>
          <div style={styles.statVal}>{daysLeft} <span style={styles.statSub}>days</span></div>
        </div>
      </div>

      {/* Motivation */}
      <div style={styles.motivCard}>
        <div style={styles.motivQuote}>"{todayQuote.quote}"</div>
        <div style={styles.motivAuthor}>— {todayQuote.author}</div>
      </div>

      {/* Modules */}
      <DSAModule
        problems={todayProblems}
        leetcodeUsername={profile?.leetcode_username}
      />

      <QuantModule
        todayModule={todayModule}
        completedModules={completedModules}
        onComplete={handleQuantComplete}
      />

      <WritingModule
        prompt={todayPrompt}
        onSubmit={handleWritingSubmit}
        submitted={writingDone}
      />

      {/* Email reminder info */}
      <div style={styles.emailCard}>
        <div style={styles.emailTitle}>📧 Daily email reminders</div>
        <div style={styles.emailRow}><span style={styles.dot} />Morning email at <strong>8:00 AM</strong> — today's problems, quant topic, prompt & motivation</div>
        <div style={styles.emailRow}><span style={{ ...styles.dot, background: '#aaa' }} />Evening nudge at <strong>8:00 PM</strong> if tasks are still incomplete</div>
      </div>
    </div>
  );
}

function getTimeOfDay() {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 17) return 'afternoon';
  return 'evening';
}

const styles = {
  page: { maxWidth: 680, margin: '0 auto', padding: '1.25rem', fontFamily: 'system-ui, sans-serif' },
  topbar: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' },
  logo: { fontSize: 18, fontWeight: 600 },
  logoAccent: { color: '#534AB7' },
  navRight: { display: 'flex', gap: 8 },
  navBtn: { fontSize: 12, padding: '5px 12px', border: '0.5px solid #ddd', borderRadius: 8, background: 'transparent', cursor: 'pointer', color: '#555' },
  settingsPanel: { background: '#fff', border: '0.5px solid #E8E8E8', borderRadius: 12, padding: '1rem 1.1rem', marginBottom: '1rem' },
  settingsTitle: { fontWeight: 500, marginBottom: '0.75rem', fontSize: 14 },
  settingsRow: { marginBottom: '0.5rem' },
  settingsLabel: { fontSize: 12, color: '#888', display: 'block', marginBottom: 6 },
  settingsInputRow: { display: 'flex', gap: 8 },
  settingsInput: { flex: 1, padding: '8px 10px', border: '0.5px solid #ddd', borderRadius: 8, fontSize: 13, outline: 'none' },
  saveBtn: { padding: '8px 16px', background: '#534AB7', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontWeight: 500 },
  settingsHint: { fontSize: 11, color: '#aaa', marginTop: 5 },
  greeting: { fontSize: 20, fontWeight: 500, marginBottom: 2 },
  date: { fontSize: 13, color: '#888', marginBottom: '1.25rem' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: '1.25rem' },
  stat: { background: '#F8F7FF', borderRadius: 8, padding: '0.75rem 1rem' },
  statLabel: { fontSize: 11, color: '#888', marginBottom: 3 },
  statVal: { fontSize: 22, fontWeight: 500 },
  statSub: { fontSize: 12, color: '#aaa', fontWeight: 400 },
  motivCard: { background: '#EEEDFE', border: '0.5px solid #CECBF6', borderRadius: 12, padding: '0.9rem 1.1rem', marginBottom: '1.25rem' },
  motivQuote: { fontSize: 13, color: '#3C3489', lineHeight: 1.6, fontStyle: 'italic' },
  motivAuthor: { fontSize: 11, color: '#534AB7', marginTop: 5 },
  emailCard: { background: '#F8F8F8', border: '0.5px solid #E8E8E8', borderRadius: 12, padding: '0.9rem 1.1rem' },
  emailTitle: { fontSize: 13, fontWeight: 500, marginBottom: '0.6rem' },
  emailRow: { display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#666', marginBottom: 6 },
  dot: { width: 8, height: 8, borderRadius: '50%', background: '#534AB7', flexShrink: 0 },
};
