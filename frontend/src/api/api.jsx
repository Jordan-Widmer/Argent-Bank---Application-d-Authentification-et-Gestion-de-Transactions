const BASE_URL = 'http://localhost:3001/api/v1';

export async function fetchUserProfile() {
  const token = localStorage.getItem('jwtToken'); // Get the JWT from local storage
  console.log('Token avant d\'envoyer la requête: ', token);

  try {
    const response = await fetch(`${BASE_URL}/user/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Erreur lors de la récupération du profil');
    }
  } catch (error) {
    console.error('Erreur lors de l\'appel de l\'API', error);
    throw error;
  }
}

export async function loginUser(credentials) {
  try {
    const response = await fetch(`${BASE_URL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Réponse après la connexion: ', data); // Log the entire response
      const token = data.body.token; // Get the JWT from the response
      localStorage.setItem('jwtToken', token); // Save the JWT to local storage
      return token;
    } else {
      throw new Error('Erreur d\'authentification');
    }
  } catch (error) {
    console.error('Erreur lors de l\'appel de l\'API', error);
    throw error;
  }
}

const Api = {
  fetchUserProfile,
  loginUser
};

export default Api;
