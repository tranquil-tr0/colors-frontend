import React from 'react';
import { useNavigate } from 'react-router-dom';

function Selector() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '100px', display: 'flex', flexDirection: 'column', gap: '32px', alignItems: 'center' }}>
      {/* No text, only icons/shapes/colors for navigation */}
      <button onClick={() => navigate('/ranking')} style={{ width: 64, height: 64, borderRadius: '50%', background: '#FFD700', border: 'none', boxShadow: '0 0 8px #FFD700', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
        <svg width="32" height="32" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="14" fill="#FFD700" />
        </svg>
      </button>
      <button onClick={() => navigate('/leaderboard')} style={{ width: 64, height: 64, borderRadius: '50%', background: '#C0C0C0', border: 'none', boxShadow: '0 0 8px #C0C0C0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
        <svg width="32" height="32" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="14" fill="#C0C0C0" />
        </svg>
      </button>
    </div>
  );
}

export default Selector;
