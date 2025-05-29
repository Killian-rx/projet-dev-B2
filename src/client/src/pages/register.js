import React, { useState } from "react";
import { registerUser } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import "../css/register.css";
import fond from '../assets/fond_3.png';
import google from '../assets/google.png';
import apple from '../assets/logo-apple.png'; // Import Apple logo if needed

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await registerUser(formData);

        if (response.error) {
            setMessage("❌ " + response.error);
        } else {
            setMessage("✅ Inscription réussie ! Connecte-toi maintenant.");
        }
    };

    return (
        <div className="register-container">
            <div className="left-side">
                <button className="close-button" onClick={() => navigate('/')}>X</button>
                <img src={fond} alt="Background" />
            </div>
            {message && <p>{message}</p>}
            <form className="register-form" onSubmit={handleSubmit}>
                <h2>Créez votre compte</h2>
                <input type="text" name="name" placeholder="Pseudo" value={formData.name} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Mot de passe" value={formData.password} onChange={handleChange} required />
                <button type="submit">S'inscrire</button>
                <p>Déjà inscrit ? <Link to="/login">Connectez-vous ici</Link></p>
                <div className="separator">
                    <div></div>
                    <span>ou</span>
                    <div></div>
                </div>
                <div className="social-login">
                    <button>
                        <img src={google} alt="Google" />
                        <span>Continuer avec Google</span>
                    </button>
                    <button>
                        <img src={apple} alt="Apple" />
                        <span>Continuer avec Apple</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Register;
