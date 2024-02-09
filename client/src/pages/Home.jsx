import React, { useState } from 'react';
import GetScore from '../components/GetScore';


export default function HomePage() {
    const [showScore, setShowScore] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!loading) {
            setLoading(true);
            try {
                // Simulate asynchronous score update process
                await updateScore();
                setSuccessMessage('Score updated successfully!');
                setShowScore(true);
            } catch (error) {
                console.error('Error updating score:', error);
                setSuccessMessage('Failed to update score. Please try again later.');
            } finally {
                setLoading(false);
                // Close success message after 3 seconds
                setTimeout(() => {
                    setSuccessMessage('');
                }, 3000);
            }
        }
    };

    const updateScore = async () => {
        // Simulate API call to update score
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate success
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
            <button className="score-button" type='submit' onClick={handleSubmit}>
                {loading ? 'Updating...' : 'Update your Score!'}
            </button>
            {showScore && (
                <div>
                    <GetScore />
                    <button onSubmit={handleHideScore}>Hide Score</button>
                </div>
            )}
            {successMessage && <div className="success-message">{successMessage}</div>}
        </div>
    );
}
