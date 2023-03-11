import React from 'react'
import SignIn from './signIn'
import './landing.css';

export default function LandingPage() {
    return (
        <div className="landing-container">
            <div className="center">
                <SignIn />
            </div>
        </div>
    )
}