import React, { useContext } from 'react';
import '../styles/nav-bar.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

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
                        <Link to="/login" onClick={logout} className="logout">Logout</Link>
                        <p className="username">{user.username}</p>
                    </>
                ) : (
                    <Link to="/register" className="login-register">Login/Register</Link>
                )}
            </div>
        </nav>
    )
}
