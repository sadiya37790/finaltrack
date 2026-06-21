// src/components/WritingModule.js
import React, { useState } from 'react';

export default function WritingModule({ prompt, onSubmit, submitted, savedText = '' }) {
  const [text, setText] = useState(savedText);

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const isReady = words >= 100;

  function handleSubmit() {
    if (isReady && !submitted) onSubmit(text);
  }

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div style={styles.title}>
          ✍ English & communication
          <span style={{ ...styles.badge, ...(submitted ? styles.badgeDone : styles.badgePending) }}>
            {submitted ? 'Submitted' : 'Pending'}
          </span>
        </div>
      </div>

      {/* Prompt */}
      <div style={styles.prompt}>"{prompt}"</div>

      {/* Text area */}
      <textarea
        style={{ ...styles.textarea, ...(submitted ? styles.textareaDisabled : {}) }}
        value={text}
        onChange={e => !submitted && setText(e.target.value)}
        placeholder="Write your paragraph here (minimum 100 words)..."
        disabled={submitted}
        rows={5}
      />

      <div style={styles.footer}>
        <span style={{ ...styles.wordCount, ...(isReady ? styles.wordCountGood : {}) }}>
          {words} / 100 words{isReady ? ' ✓' : ''}
        </span>
        {!submitted && (
          <button
            onClick={handleSubmit}
            disabled={!isReady}
            style={{ ...styles.submitBtn, ...(isReady ? styles.submitBtnReady : styles.submitBtnDisabled) }}
          >
            Submit
          </button>
        )}
        {submitted && (
          <span style={styles.submittedMsg}>Submitted today ✓</span>
        )}
      </div>

      {!submitted && !isReady && words > 0 && (
        <div style={styles.hint}>{100 - words} more words to go</div>
      )}
    </div>
  );
}

const styles = {
  card: { background: '#fff', border: '0.5px solid #E8E8E8', borderRadius: 12, padding: '1rem 1.1rem', marginBottom: '0.9rem' },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' },
  title: { fontSize: 14, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8 },
  badge: { fontSize: 11, padding: '2px 8px', borderRadius: 99 },
  badgePending: { background: '#F1EFE8', color: '#5F5E5A' },
  badgeDone: { background: '#E1F5EE', color: '#085041' },
  prompt: { fontStyle: 'italic', fontSize: 13, color: '#5F5E5A', background: '#F8F7FF', borderLeft: '3px solid #534AB7', padding: '8px 12px', marginBottom: '0.75rem', lineHeight: 1.6 },
  textarea: { width: '100%', border: '0.5px solid #ddd', borderRadius: 8, padding: '10px 12px', fontSize: 13, fontFamily: 'inherit', resize: 'vertical', outline: 'none', lineHeight: 1.6, color: '#333', minHeight: 120 },
  textareaDisabled: { background: '#F8F8F8', color: '#888', cursor: 'not-allowed' },
  footer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  wordCount: { fontSize: 12, color: '#aaa' },
  wordCountGood: { color: '#1D9E75' },
  submitBtn: { fontSize: 12, padding: '5px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 500 },
  submitBtnReady: { background: '#534AB7', color: '#fff' },
  submitBtnDisabled: { background: '#E8E8E8', color: '#aaa', cursor: 'not-allowed' },
  submittedMsg: { fontSize: 12, color: '#1D9E75', fontWeight: 500 },
  hint: { fontSize: 11, color: '#BA7517', marginTop: 4 },
};
