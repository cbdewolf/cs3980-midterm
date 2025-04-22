import React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import '../styles/home.css'
import NavBar from "../components/NavBar"

const Home = () => {
    return (
        <>
            <NavBar />
            <div className="home-container">
                <h1>Payment Tracker</h1>
                <p>Please login</p>
            </div>
        </>
    )
}

export default Home