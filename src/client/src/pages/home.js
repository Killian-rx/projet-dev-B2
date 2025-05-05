import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../services/api';

function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUserProfile();
      if (!data.error) {
        setUser(data);
      }
    };
    fetchUser();
  }, []);

  return (
    <div>
      <h1>Bienvenue sur la page d'accueil !</h1>
      {user ? (
        <div>
          <p><strong>Nom :</strong> {user.name}</p>
          <p><strong>Email :</strong> {user.email}</p>
          <p><strong>Inscrit depuis :</strong> {new Date(user.created_at).toLocaleDateString()}</p>
        </div>
      ) : (
        <p>Chargement des informations utilisateur...</p>
      )}
    </div>
  );
}

export default Home;
