import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
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
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <form onSubmit={handleRegisterUser}>
                <label>Name</label>
                <input
                    type="text"
                    placeholder="Enter Name..."
                    value={userData.name}
                    onChange={(event) =>
                        setUserData({ ...userData, name: event.target.value })
                    }
                />
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
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
