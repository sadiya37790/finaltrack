// src/components/DSAModule.js
import React, { useEffect } from 'react';
import { useLeetCode } from '../hooks/useLeetCode';

export default function DSAModule({ problems, leetcodeUsername }) {
  const { status, statusMessage, verifiedProblems, verifyTodaySubmissions } = useLeetCode();

  useEffect(() => {
    if (leetcodeUsername && problems.length) {
      verifyTodaySubmissions(leetcodeUsername, problems);
    }
  }, [leetcodeUsername, problems]);

  const verifiedCount = Object.values(verifiedProblems).filter(Boolean).length;
  const progressPct = Math.round((verifiedCount / 3) * 100);

  const statusColors = {
    idle: { bg: '#F1EFE8', color: '#5F5E5A', icon: 'ℹ️' },
    checking: { bg: '#EEEDFE', color: '#3C3489', icon: '⟳' },
    success: { bg: '#E1F5EE', color: '#085041', icon: '✓' },
    error: { bg: '#FCEBEB', color: '#A32D2D', icon: '!' },
  };
  const sc = statusColors[status] || statusColors.idle;

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div style={styles.title}>
          <span style={styles.icon}>{'</>'}</span>
          DSA — LeetCode
          <span style={{ ...styles.badge, background: verifiedCount === 3 ? '#E1F5EE' : '#EEEDFE', color: verifiedCount === 3 ? '#085041' : '#3C3489' }}>
            {verifiedCount} / 3 verified
          </span>
        </div>
        <a href="https://leetcode.com/problemset/" target="_blank" rel="noreferrer" style={styles.lcLink}>
          Open LeetCode ↗
        </a>
      </div>

      {/* Status bar */}
      <div style={{ ...styles.statusBar, background: sc.bg, color: sc.color }}>
        <span>{sc.icon}</span>
        <span style={{ fontSize: 12 }}>{statusMessage}</span>
        {status !== 'checking' && leetcodeUsername && (
          <button onClick={() => verifyTodaySubmissions(leetcodeUsername, problems)} style={styles.recheckBtn}>
            Recheck
          </button>
        )}
      </div>

      {/* Problem rows */}
      {problems.map((p, i) => {
        const verified = verifiedProblems[p.slug];
        const diffStyle = p.diff === 'Easy' ? styles.easy : p.diff === 'Medium' ? styles.medium : styles.hard;
        return (
          <div key={p.slug} style={styles.problemRow}>
            <div style={{ ...styles.checkbox, ...(verified ? styles.checkboxDone : {}) }}>
              {verified && '✓'}
            </div>
            <span style={{ ...styles.problemName, ...(verified ? styles.struckThrough : {}) }}>
              {p.name}
            </span>
            <span style={{ ...styles.diffBadge, ...diffStyle }}>{p.diff}</span>
            <span style={{ ...styles.statusPill, background: verified ? '#E1F5EE' : '#F1EFE8', color: verified ? '#085041' : '#888780' }}>
              {status === 'checking' ? 'Checking...' : verified ? 'Accepted today' : 'Not verified'}
            </span>
            <a href={p.url} target="_blank" rel="noreferrer" style={styles.lcLink}>↗</a>
          </div>
        );
      })}

      {/* Re-submit guidance */}
      {status !== 'checking' && verifiedCount < 3 && (
        <div style={styles.tip}>
          <strong>Already solved one of these before?</strong> Just open it on LeetCode and re-submit your old solution — it will count as today's submission and get verified automatically.
        </div>
      )}

      {/* Progress bar */}
      <div style={styles.progWrap}>
        <div style={styles.progLabel}>
          <span>Today's progress</span><span>{verifiedCount} / 3</span>
        </div>
        <div style={styles.progBg}>
          <div style={{ ...styles.progFill, width: progressPct + '%' }} />
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: { background: '#fff', border: '0.5px solid #E8E8E8', borderRadius: 12, padding: '1rem 1.1rem', marginBottom: '0.9rem' },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' },
  title: { fontSize: 14, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8 },
  icon: { fontSize: 16 },
  badge: { fontSize: 11, padding: '2px 8px', borderRadius: 99, fontWeight: 400 },
  lcLink: { fontSize: 12, color: '#534AB7', textDecoration: 'none' },
  statusBar: { display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, padding: '7px 10px', borderRadius: 8, marginBottom: '0.75rem' },
  recheckBtn: { marginLeft: 'auto', fontSize: 11, padding: '2px 8px', border: '0.5px solid currentColor', borderRadius: 6, background: 'transparent', cursor: 'pointer', color: 'inherit' },
  problemRow: { display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', borderTop: '0.5px solid #F0F0F0', fontSize: 13 },
  checkbox: { width: 18, height: 18, borderRadius: 4, border: '1.5px solid #ddd', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 },
  checkboxDone: { background: '#1D9E75', borderColor: '#1D9E75', color: '#fff' },
  problemName: { flex: 1 },
  struckThrough: { textDecoration: 'line-through', color: '#aaa' },
  diffBadge: { fontSize: 10, padding: '1px 6px', borderRadius: 4 },
  easy: { background: '#EAF3DE', color: '#3B6D11' },
  medium: { background: '#FAEEDA', color: '#854F0B' },
  hard: { background: '#FCEBEB', color: '#A32D2D' },
  statusPill: { fontSize: 11, padding: '2px 7px', borderRadius: 99, whiteSpace: 'nowrap' },
  tip: { fontSize: 12, color: '#5F5E5A', background: '#F8F7FF', border: '0.5px solid #CECBF6', borderRadius: 8, padding: '8px 10px', margin: '8px 0', lineHeight: 1.6 },
  progWrap: { marginTop: '0.6rem' },
  progLabel: { display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#aaa', marginBottom: 3 },
  progBg: { height: 5, background: '#F0F0F0', borderRadius: 99, overflow: 'hidden' },
  progFill: { height: '100%', background: '#534AB7', borderRadius: 99, transition: 'width 0.4s' },
};
