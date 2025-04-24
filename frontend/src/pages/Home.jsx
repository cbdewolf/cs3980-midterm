import React from 'react';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import '../styles/home.css';
import NavBar from '../components/NavBar';

const Home = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <>
      <NavBar />
      <div className="home-container">
        <h1 className="home-title">Payment Tracker</h1>
        <p className="home-text">Start tracking your payments today!</p>
        {user ? (
          <button className="home-button" onClick={() => navigate('/payments')}>
            Go to Payments
          </button>
        ) : (
          <button className="home-button" onClick={() => navigate('/login')}>
            Login/Register
          </button>
        )}
      </div>
    </>
  );
};

export default Home;
