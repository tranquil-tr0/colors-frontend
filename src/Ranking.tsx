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

function Ranking() {
  const [colors, setColors] = useState(null as ColorsType | null);
  const [loading, setLoading] = useState(false);

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
  };

  useEffect(() => {
    fetchColors();
  }, []);

  return (
    <div style={{ textAlign: 'center', fontFamily: 'sans-serif', marginTop: '2rem', padding: '1rem' }}>
      {/* No text, only shapes/colors/icons */}
      {loading || !colors ? (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <svg width="48" height="48" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="20" fill="#eee" stroke="#ccc" strokeWidth="4" />
            <circle cx="24" cy="24" r="8" fill="#ccc" stroke="#eee" strokeWidth="2" />
          </svg>
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '2rem',
            maxWidth: '100%',
          }}
        >
          <ColorButton color={colors.color1} onClick={() => sendResult('1')} />
          {/* Icon for VS, no text */}
          <svg width="48" height="48" viewBox="0 0 48 48" style={{ margin: '0 2rem' }}>
            <rect x="20" y="10" width="8" height="28" rx="4" fill="#333" />
            <circle cx="24" cy="24" r="6" fill="#fff" stroke="#333" strokeWidth="2" />
          </svg>
          <ColorButton color={colors.color2} onClick={() => sendResult('2')} />
        </div>
      )}
    </div>
  );
}

export default Ranking;
