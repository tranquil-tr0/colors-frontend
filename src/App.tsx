import React, { useEffect, useState } from 'react';

const API_BASE = 'http://192.168.167.171:2086/api';

type ColorButtonProps = {
  color: string;
  onClick: () => void;
};

function ColorButton({ color, onClick }: ColorButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        background: `#${color}`,
        width: '120px',
        height: '120px',
        margin: '1rem',
        border: '4px solid #333',
        borderRadius: '50%',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 0 12px #333',
      }}
    >
      {/* No text, just color circle */}
      <svg width="48" height="48">
        <circle cx="24" cy="24" r="22" fill={`#${color}`} stroke="#333" strokeWidth="2" />
      </svg>
    </button>
  );
}

type ColorsType = {
  color1: string;
  color2: string;
};

function App() {
  const [colors, setColors] = useState(null as ColorsType | null);
  const [loading, setLoading] = useState(false);
  const [leaderboard, setLeaderboard] = useState([] as string[]);

  const fetchColors = async () => {
    setLoading(true);
    const res = await fetch(`${API_BASE}/get-colors-to-grade`);
    const data = await res.json();
    setColors(data);
    setLoading(false);
  };

  const sendResult = async (choice: string) => {
    if (!colors) return;
    const body = `${colors.color1} ${colors.color2} ${choice}`;
    await fetch(`${API_BASE}/say-result`, {
      method: 'POST',
      body,
    });
    fetchColors();
    fetchLeaderboard();
  };

  const fetchLeaderboard = async () => {
    const res = await fetch(`${API_BASE}/send-leaderboard`);
    const data = await res.json();
    setLeaderboard(data.leaderboard || []);
  };

  useEffect(() => {
    fetchColors();
    fetchLeaderboard();
  }, []);

  return (
    <div style={{ textAlign: 'center', fontFamily: 'sans-serif', marginTop: '2rem' }}>
      {/* No text, only shapes/colors/icons */}
      {loading || !colors ? (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <svg width="48" height="48" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="20" fill="#eee" stroke="#ccc" strokeWidth="4" />
            <circle cx="24" cy="24" r="8" fill="#ccc" stroke="#eee" strokeWidth="2" />
          </svg>
        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem', flexWrap: 'wrap', maxWidth: '100%' }}>
          <ColorButton color={colors.color1} onClick={() => sendResult('1')} />
          {/* Icon for VS, no text */}
          <svg width="48" height="48" viewBox="0 0 48 48" style={{ margin: '0 2rem' }}>
            <rect x="20" y="10" width="8" height="28" rx="4" fill="#333" />
            <circle cx="24" cy="24" r="6" fill="#fff" stroke="#333" strokeWidth="2" />
          </svg>
          <ColorButton color={colors.color2} onClick={() => sendResult('2')} />
        </div>
      )}
      {/* Leaderboard icons only */}
      <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-end', justifyContent: 'center', marginTop: '2rem' }}>
        <div style={{ width: 48, height: 80, background: 'gold', borderRadius: '12px 12px 0 0', boxShadow: '0 0 8px gold', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="14" fill="#FFD700" />
          </svg>
        </div>
        <div style={{ width: 48, height: 60, background: '#C0C0C0', borderRadius: '12px 12px 0 0', boxShadow: '0 0 8px #C0C0C0', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="14" cy="14" r="12" fill="#C0C0C0" />
          </svg>
        </div>
        <div style={{ width: 48, height: 40, background: '#CD7F32', borderRadius: '12px 12px 0 0', boxShadow: '0 0 8px #CD7F32', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="#CD7F32" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default App;
