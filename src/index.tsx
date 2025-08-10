import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Selector from './Selector.tsx';
import Leaderboard from './Leaderboard.tsx';
import Ranking from './Ranking.tsx';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Selector />} />
      <Route path="/ranking" element={<Ranking />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
    </Routes>
  </BrowserRouter>
);
