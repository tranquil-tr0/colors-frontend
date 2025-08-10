import React, { useEffect, useState } from 'react';

const API_BASE = 'http://192.168.167.171:2086/api';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([] as string[]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const res = await fetch(`${API_BASE}/send-leaderboard`);
      const data = await res.json();
      setLeaderboard(data.leaderboard || []);
    };
    fetchLeaderboard();
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#222', padding: '2rem 0', boxSizing: 'border-box' }}>
      <h1 style={{ color: '#fff', textAlign: 'center' }}></h1>
      <div style={{ width: '100%' }}>
        {leaderboard.map((color) => (
          <div key={color} style={{
            background: `#${color}`,
            color: '#fff',
            width: '100%',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            borderBottom: '1px solid #333',
            boxSizing: 'border-box',
          }}>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;
