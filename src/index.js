
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Selector from './Selector';
import Leaderboard from './Leaderboard';
import Ranking from './Ranking';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Selector />} />
  <Route path="/ranking" element={<Ranking />} />
  <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/both" element={<App />} />
    </Routes>
  </BrowserRouter>
);
