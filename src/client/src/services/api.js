const API_URL = "http://localhost:5000"; // Adresse de ton backend Express

export const registerUser = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        return await response.json();
    } catch (error) {
        console.error("Erreur lors de l'inscription :", error);
        return { error: "Erreur réseau" };
    }
};


export const loginUser = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        return { error: "Erreur réseau" };
    }
};
