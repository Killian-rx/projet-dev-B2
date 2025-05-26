// pages/login.js
import React, { useState, useEffect } from 'react';
import { loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    useEffect(() => {
      localStorage.removeItem('token');
    }, []);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await loginUser(formData);

        if (response.error) {
            setMessage('❌ ' + response.error);
        } else {
            setMessage('✅ Connexion réussie !');
            navigate('/projects'); // Redirige vers la page des projets
        }
    };

    return (
        <div className="login-container">
            <h2>Connexion</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Mot de passe" value={formData.password} onChange={handleChange} required />
                <button type="submit">Se connecter</button>
                <p>Pas encore inscrit ? <a href="/register">Inscrivez-vous ici</a></p>
            </form>
        </div>
    );
};

export default Login;
