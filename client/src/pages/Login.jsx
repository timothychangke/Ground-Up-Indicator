import { useEffect, useState,useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Components from './loginStyles';
import { UserContext } from '../context/userContext';

export default function LoginPage({ handleSetPage, pageType }) {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: '',
        password: '',
    });
    const { user, userDispatch } = useContext(UserContext);

    const getUser = () => {
        if (!user) {
            axios.get('/profile').then(({ data }) => {
                userDispatch({
                    type: 'SET_USERS',
                    payload: data,
                });
            });
        }
    };
    const handleLoginUser = async (event) => {
        event.preventDefault();
        const { email, password } = userData;
        try {
            const response = await axios.post('/login', { email, password });
            if (response.data.error) {
                toast.error(response.data.error);
            } else {
                getUser();
                setUserData({});
                toast.success('Login successful. Welcome!');
                setTimeout(()=>{
                },2000)
                navigate('/tracker');
                window.location.reload(false);
            }
        } catch (error) {}
    };
    return (
        <Components.Form className="bg-white flex items-center justify-center flex-col px-10 h-full text-center">
            <Components.Title>Sign in</Components.Title>
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
            <Components.Button type="submit" onClick={handleLoginUser}>Login</Components.Button>
        </Components.Form>
    );
}
