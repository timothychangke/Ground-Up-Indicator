import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as Components from './loginStyles';

export default function RegisterPage({ handleSetPage, pageType }) {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const handleRegisterUser = async (event) => {
        event.preventDefault();
        const { name, email, password } = userData;
        try {
            const response = await axios.post('/register', {
                name,
                email,
                password,
            });
            if (response.data.error) {
                toast.error(response.data.error);
            } else {
                setUserData({});
                toast.success('Sign up successful. Please login!');
                handleSetPage('login');
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
            <Components.Form
                onSubmit={handleRegisterUser}
            >
                <Components.Title>Create Account</Components.Title>
                <Components.Input
                    type="text"
                    placeholder="Name..."
                    value={userData.name}
                    onChange={(event) =>
                        setUserData({ ...userData, name: event.target.value })
                    }
                />
                <Components.Input
                    type="email"
                    placeholder="Email..."
                    value={userData.email}
                    onChange={(event) =>
                        setUserData({ ...userData, email: event.target.value })
                    }
                />
                <Components.Input
                    type="password"
                    placeholder="Password..."
                    value={userData.password}
                    onChange={(event) =>
                        setUserData({
                            ...userData,
                            password: event.target.value,
                        })
                    }
                />
                <Components.Button
                    type="submit"
                    
                >
                    Sign up
                </Components.Button>
            </Components.Form>
    );
}
