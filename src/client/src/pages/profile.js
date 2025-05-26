import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../services/api';
import '../css/profile.css';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
        if (data.error) setError(data.error);
        else setUser(data);
      } catch {
        setError('Erreur lors du chargement du profil');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token, navigate]);

  if (loading) return <p className="profile-loading">Chargement du profil...</p>;
  if (error) return <p className="profile-error">❌ {error}</p>;

  return (
    <div className="profile-container">
      <h2>Mon profil</h2>
      <div className="profile-info">
        <p><strong>Nom :</strong> {user.name}</p>
        <p><strong>Email :</strong> {user.email}</p>
        <p><strong>Inscrit depuis :</strong> {new Date(user.created_at).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

export default Profile;