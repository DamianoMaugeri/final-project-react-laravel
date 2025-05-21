import React, { useState } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null); // 👈 stato per utente autenticato

  const fetchUser = async (token) => {
    try {
      const response = await api.get('/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (err) {
      console.error('Errore nel recupero utente:', err);
      setError('Errore nel recupero utente');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setUser(null);

    try {
      let response;

      if (isLogin) {
        response = await api.post('/login', { email, password });
      } else {
        response = await api.post('/register', { name, email, password });
      }

      const token = response.data.access_token;
      localStorage.setItem('token', token);

      // Imposta il token per le chiamate future
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setMessage(isLogin ? 'Login effettuato con successo!' : 'Registrazione avvenuta con successo!');
      await fetchUser(token); // 👈 recupera i dettagli dell’utente
      console.log(user)

    } catch (err) {
      setError(err.response?.data?.message || 'Errore imprevisto');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">
        {isLogin ? 'Login' : 'Registrazione'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div>
            <label className="block text-sm font-medium">Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {error && <div className="text-red-600">{error}</div>}
        {message && <div className="text-green-600">{message}</div>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isLogin ? 'Accedi' : 'Registrati'}
        </button>
      </form>

      <div className="mt-4 text-center">
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-500 underline"
        >
          {isLogin ? 'Non hai un account? Registrati' : 'Hai già un account? Accedi'}
        </button>
      </div>

      {user && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h3 className="text-lg font-semibold mb-2">Utente autenticato:</h3>
          <p><strong>Nome:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Ruolo:</strong> {user.role}</p>
        </div>
      )}
    </div>
  );
}
