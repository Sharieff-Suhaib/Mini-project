import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/auth',
});

export const registerUser = (data) => api.post('/register', data);
export const loginUser = async (email, password) => {
  try {
      const response = await fetch(`http://localhost:5000/api/auth/login`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
          throw new Error('Login failed');
      }
      
      const data = await response.json();
      return data; 
  } catch (error) {
      console.error("Login error:", error);
      throw error;
  }
};
export default api;
