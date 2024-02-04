import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import TrackerPage from './pages/Tracker';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from './context/userContext';

import { store } from './store/store';
import { Provider } from 'react-redux';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

function App() {
    return (
        <Provider store={store}>
            <UserContextProvider>
                <Navbar />
                <Toaster
                    position="bottom-right"
                    toastOptions={{ duration: 2000 }}
                />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/tracker" element={<TrackerPage />} />
                </Routes>
            </UserContextProvider>
        </Provider>
    );
}

export default App;
