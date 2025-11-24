import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import AdminPanel from './pages/AdminPanel';
import GalleryPage from './pages/GalleryPage';
import Login from './pages/Login'; // ✅ NEW
import './App.css';

export default function App(){
  return (
    <div className="app">
      <header className="site-header">
        <div className="container">
          <Link to="/"><h1 className="brand">Tee Shop</h1></Link>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/login">Admin</Link> {/* Updated to go to login */}
          </nav>
        </div>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/login" element={<Login />} /> {/* NEW */}
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <div className="container">&copy; {new Date().getFullYear()} Tee Shop</div>
      </footer>
    </div>
  );
}
