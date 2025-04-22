import React, { useContext } from 'react';
import '../styles/nav-bar.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

// the user will evnetually fetched from backend to get the user who is logged in
export default function NavBar() {

    const { user, logout } = useContext(UserContext);

    return (
        <nav className="navbar">
            <div className="nav-left">
                <Link to="/payments" className="nav-item">Payments</Link>
            </div>
            <div className="nav-right">
                {user ? (
                    <>
                        <button onClick={logout} className="logout">Logout</button>
                        <p className="username">{user.username}</p>
                    </>
                ) : (
                    <Link to="/register" className="username">Guest</Link>
                )}
            </div>
        </nav>
    )
}
