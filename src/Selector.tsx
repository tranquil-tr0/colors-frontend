import React from 'react';
import { useNavigate } from 'react-router-dom';

function Selector() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Choose a Page</h1>
      <button onClick={() => navigate('/ranking')}>Ranking Page</button>
      <button onClick={() => navigate('/leaderboard')}>Leaderboard Page</button>
      <button onClick={() => navigate('/both')}>Both Page</button>
    </div>
  );
}

export default Selector;
