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
        color: '#fff',
        fontSize: '2rem',
        width: '120px',
        height: '120px',
        margin: '1rem',
        border: '2px solid #333',
        borderRadius: '12px',
        cursor: 'pointer',
      }}
    >
      #{color}
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
    <div style={{ textAlign: 'center', fontFamily: 'sans-serif', marginTop: '2rem' }}>
      <h1>Choose Your Favorite Color</h1>
      {loading || !colors ? (
        <p>Loading...</p>
      ) : (
        <div>
          <ColorButton color={colors.color1} onClick={() => sendResult('1')} />
          <span style={{ fontSize: '2rem', margin: '2rem' }}>vs</span>
          <ColorButton color={colors.color2} onClick={() => sendResult('2')} />
        </div>
      )}
    </div>
  );
}

export default Ranking;
