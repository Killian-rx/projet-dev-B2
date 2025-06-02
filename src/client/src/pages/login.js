// pages/login.js
import React, { useState, useEffect } from 'react';
import { loginUser } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import '../css/login.css';
import fond from '../assets/fond_2.png';
import google from '../assets/google.png';
import apple from '../assets/logo-apple.png'; // Import Apple logo if needed

const Login = () => {
    useEffect(() => {
      localStorage.removeItem('token');
    }, []);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            setError('Veuillez remplir tous les champs');
            return;
        }
        const response = await loginUser(formData);

        console.log(response); // Inspectez la réponse de l'API

        if (response.error) {
            setMessage('❌ ' + response.error);
        } else if (response.token) { // Vérifie que le token est présent
            localStorage.setItem('token', response.token); // Sauvegarde du token
            console.log('Token sauvegardé, redirection en cours...'); // Vérifiez si cette ligne est atteinte
            setMessage('✅ Connexion réussie !');
            navigate('/projects'); // Redirige vers la page des projets
        } else {
            setMessage('❌ Une erreur inattendue est survenue.');
        }
    };

    return (
        <div className="login-container">
            <div className='left-side'>
                <button className='close-button' onClick={() => navigate('/')}>X</button>
                <img src={fond} alt='Login illustration'/>
            </div>
          <form className="login-form" onSubmit={handleSubmit}>
            <h2>Connexion</h2>
            {message && <p>{message}</p>}
            {error && <p className="error">{error}</p>}
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              name="email"
              placeholder="exemple@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="password">Mot de passe*</label>
            <input
              type="password"
              name="password"
              placeholder="Votre mot de passe"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit">Se connecter</button>
            <p>
                Vous n'avez pas de compte ? <Link to="/register">Inscrivez-vous</Link>
            </p>
            <div className='separator'>
                <div></div>
                <span>ou</span>
                <div></div>
            </div>
            <div className="social-login">
                <button className="google-login">
                <img src={google} alt="Google logo" />
                <span>Se connecter avec Google</span>
                </button>
                <button className="apple-login">
                <img src={apple} alt="Apple logo" />
                <span>Se connecter avec Apple</span>
                </button>
            </div>
          </form>
        </div>
    );
};

export default Login;
