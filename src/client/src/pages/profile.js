import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, updateUserProfile } from '../services/api';
import '../css/profile.css';
import Navbar from '../components/navbar';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');
  const [updateMessage, setUpdateMessage] = useState('');
  const [updateError, setUpdateError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile(token);
        console.log('user profile:', data); // log des données reçues
        setUser(data);
      } catch (err) {
        setError(err.message || 'Erreur lors du chargement du profil');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {};
    if (emailField) payload.email = emailField;
    if (passwordField) payload.password = passwordField;
    const result = await updateUserProfile(payload, token);
    if (result.error) setUpdateError(result.error);
    else setUpdateMessage(result.message || 'Profil mis à jour');
  };

  if (loading) return <p className="profile-loading">Chargement du profil...</p>;
  if (error) return <p className="profile-error">❌ {error}</p>;

  // Affiche les infos utilisateur
  return (
    <>
      <Navbar/>
      <div className="profile-container">
        <h2>Mon profil</h2>
        <div className="profile-info">
          <p><strong>Pseudo :</strong> {user.name}</p>
          <p><strong>Email :</strong> {user.email}</p>
          <p>
            <strong>Inscrit depuis :</strong>{' '}
            {new Date(user.created_at).toLocaleDateString()}
          </p>
        </div>

        <div className="profile-edit">
          <h3>Modifier mon profil</h3>
          <form onSubmit={handleSubmit}>
            <label>
              Nouvel Email:
              <input
                type="email"
                value={emailField}
                onChange={(e) => setEmailField(e.target.value)}
              />
            </label>
            <label>
              Nouveau mot de passe:
              <input
                type="password"
                value={passwordField}
                onChange={(e) => setPasswordField(e.target.value)}
              />
            </label>
            <button type="submit">Mettre à jour</button>
          </form>
          {updateMessage && <p className="profile-success">{updateMessage}</p>}
          {updateError && <p className="profile-error">❌ {updateError}</p>}
        </div>
      </div>
    </>
  );
}

export default Profile;