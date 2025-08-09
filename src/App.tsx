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
      <h2>Leaderboard</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {leaderboard.map((color) => (
          <div key={color} style={{
            background: `#${color}`,
            color: '#fff',
            width: '80px',
            height: '80px',
            margin: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            border: '1px solid #333',
          }}>
            #{color}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
