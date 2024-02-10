import React, { useEffect, useState } from 'react';
import BannerBackground from '../assets/images/background.png';
import BannerImage from '../assets/images/trees3.png';
import { FiArrowRight } from 'react-icons/fi';
import classes from '../styles/homepage.module.css';
import { NavLink } from 'react-router-dom';
import './Home.css';



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
  

    return  (

        <div className={classes.home_banner_container}>
            <div className={classes.home_bannerImage_container}>
                <img src={BannerBackground} alt="trees" />
            </div>
            <div className={classes.home_text_section}>
                <h1 className={classes.primary_heading}>
                    Measure your impact, shape a greener future
                </h1>
                <p className={classes.primary_text}>
                    • our trusted Ground Up Indicator •
                </p>
                    <NavLink className={classes.secondary_button} to="/login">
                        Use GUI Now <FiArrowRight />{' '}
                    </NavLink>
            </div>
                <div className={classes.home_image_section}>
                    <img
                        src={BannerImage}
                        style={{ 'border-radius': '100%' }}
                        alt=""
                    />
                </div>
        </div>
    );
}
