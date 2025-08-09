
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Selector from './Selector';
import './index.css';

function Ranking() {
  return <div>Ranking Page (to be implemented)</div>;
}

function Leaderboard() {
  return <div>Leaderboard Page (to be implemented)</div>;
}

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
