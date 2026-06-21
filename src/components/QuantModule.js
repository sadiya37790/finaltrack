// src/components/QuantModule.js
import React, { useState } from 'react';
import { QUANT_MODULES } from '../lib/dailyContent';

export default function QuantModule({ todayModule, completedModules = [], onComplete }) {
  const [activeStep, setActiveStep] = useState(null);

  const steps = [
    { id: 'notes', label: 'Concept notes', icon: '📖' },
    { id: 'practice', label: 'Practice set (10 Qs)', icon: '✏️' },
    { id: 'quiz', label: 'Timed quiz', icon: '⏱' },
  ];

  const isDone = completedModules.includes(todayModule.id);
  const completedCount = completedModules.length;

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div style={styles.title}>
          <span>∑</span>
          Quantitative aptitude
          <span style={{ ...styles.badge, background: '#FAEEDA', color: '#633806' }}>
            {todayModule.name}
          </span>
        </div>
      </div>

      {/* Today's topics */}
      <div style={styles.topicRow}>
        {todayModule.topics.map(t => (
          <span key={t} style={styles.topicPill}>{t}</span>
        ))}
      </div>

      {/* Steps */}
      <div style={styles.stepsGrid}>
        {steps.map(step => (
          <div
            key={step.id}
            style={{ ...styles.stepItem, ...(activeStep === step.id ? styles.stepActive : {}) }}
            onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
          >
            <span>{step.icon}</span>
            <span style={{ fontSize: 12 }}>{step.label}</span>
          </div>
        ))}
        <div
          style={{ ...styles.stepItem, ...(isDone ? styles.stepDone : {}), cursor: 'pointer' }}
          onClick={!isDone ? onComplete : undefined}
        >
          <span>{isDone ? '✓' : '○'}</span>
          <span style={{ fontSize: 12 }}>{isDone ? 'Completed!' : 'Mark complete'}</span>
        </div>
      </div>

      {/* Module progress across all 12 */}
      <div style={styles.progWrap}>
        <div style={styles.progLabel}>
          <span>Modules completed this cycle</span>
          <span>{completedCount} / {QUANT_MODULES.length}</span>
        </div>
        <div style={styles.progBg}>
          <div style={{ ...styles.progFill, width: Math.round(completedCount / QUANT_MODULES.length * 100) + '%' }} />
        </div>
      </div>

      {/* All modules chips */}
      <div style={styles.allModules}>
        {QUANT_MODULES.map(m => (
          <span
            key={m.id}
            style={{
              ...styles.modulePill,
              ...(m.id === todayModule.id ? styles.pillToday : {}),
              ...(completedModules.includes(m.id) ? styles.pillDone : {}),
            }}
          >
            {m.name}
          </span>
        ))}
      </div>
    </div>
  );
}

const styles = {
  card: { background: '#fff', border: '0.5px solid #E8E8E8', borderRadius: 12, padding: '1rem 1.1rem', marginBottom: '0.9rem' },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' },
  title: { fontSize: 14, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8 },
  badge: { fontSize: 11, padding: '2px 8px', borderRadius: 99 },
  topicRow: { display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: '0.75rem' },
  topicPill: { fontSize: 11, padding: '3px 9px', borderRadius: 99, background: '#FAEEDA', color: '#633806', border: '0.5px solid #FAC775' },
  stepsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7, marginBottom: '0.75rem' },
  stepItem: { border: '0.5px solid #E8E8E8', borderRadius: 8, padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 13, color: '#888' },
  stepActive: { border: '0.5px solid #AFA9EC', background: '#EEEDFE', color: '#3C3489' },
  stepDone: { border: '0.5px solid #9FE1CB', background: '#E1F5EE', color: '#085041' },
  progWrap: { marginTop: '0.5rem' },
  progLabel: { display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#aaa', marginBottom: 3 },
  progBg: { height: 5, background: '#F0F0F0', borderRadius: 99, overflow: 'hidden' },
  progFill: { height: '100%', background: '#BA7517', borderRadius: 99, transition: 'width 0.4s' },
  allModules: { display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: '0.6rem' },
  modulePill: { fontSize: 11, padding: '3px 8px', borderRadius: 99, border: '0.5px solid #E8E8E8', color: '#aaa' },
  pillToday: { border: '0.5px solid #AFA9EC', background: '#EEEDFE', color: '#3C3489' },
  pillDone: { background: '#E1F5EE', color: '#085041', border: '0.5px solid #9FE1CB' },
};
