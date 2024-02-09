import React, { useState } from 'react';
import GetScore from '../components/getScore';
import './Home.css'

export default function HomePage() {
    const [showScore, setShowScore] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleUpdateScore = async () => {
        if (!loading) {
            setLoading(true);
            try {
                await updateScore();
                setSuccessMessage('Score updated successfully!');
                setShowScore(true);
            } catch (error) {
                console.error('Error updating score:', error);
                setSuccessMessage(
                    'Failed to update score. Please try again later.'
                );
            } finally {
                setLoading(false);
                setTimeout(() => {
                    setSuccessMessage('');
                }, 3000);
            }
        }
    };

    const updateScore = async () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 1500);
        });
    };

    const handleHideScore = () => {
        setShowScore(false);
    };

    return (
        <div className="home-container">
            <div>Home</div>
            <button className="update-score-button" onClick={handleUpdateScore}>
                {loading ? 'Updating...' : 'Update your Score!'}
            </button>
            {showScore && (
                <div>
                    <GetScore />
                    <button
                        className="hide-score-button"
                        onClick={handleHideScore}
                    >
                        Hide Score
                    </button>
                </div>
            )}
            {successMessage && (
                <div className="success-message">{successMessage}</div>
            )}
        </div>
    );
}
