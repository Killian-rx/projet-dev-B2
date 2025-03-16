import React, { useState } from "react";
import { registerUser } from "./api"; // Import de l'API

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [message, setMessage] = useState("");

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
            <h2>Inscription</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Nom" value={formData.name} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Mot de passe" value={formData.password} onChange={handleChange} required />
                <button type="submit">S'inscrire</button>
            </form>
        </div>
    );
};

export default Register;
