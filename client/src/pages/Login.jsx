import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import classes from '../styles/login.module.css'

export default function LoginPage() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: '',
        password: '',
    });
    const handleLoginUser = async (event) => {
        event.preventDefault();
        const { email, password } = userData;
        try {
            const response = await axios.post('/login', { email, password });
            if (response.data.error) {
                toast.error(response.data.error);
            } else {
                setUserData({});
                toast.success('Login successful. Welcome!');
                navigate('/tracker');
            }
        } catch (error) {}
    };
    return (
        <div>
            <form onSubmit={handleLoginUser}>
                <label>Email</label>
                <input
                    type="email"
                    placeholder="Enter Email..."
                    value={userData.email}
                    onChange={(event) =>
                        setUserData({ ...userData, email: event.target.value })
                    }
                />
                <label>Password</label>
                <input
                    type="password"
                    placeholder="Enter Password..."
                    value={userData.password}
                    onChange={(event) =>
                        setUserData({
                            ...userData,
                            password: event.target.value,
                        })
                    }
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}


