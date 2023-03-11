import React from 'react'
import SignInModal from './signin'
import './landing.css';

export default function LandingPage() {
    return (
        <div className="landing-container">
            <div className="center">
                <SignInModal />
            </div>
        </div>
    )
}