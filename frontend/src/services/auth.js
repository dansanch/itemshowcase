const API_URL = 'http://localhost:5000/api/auth';

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (response.ok) {
    localStorage.setItem('token', data.token);
  } else {
    throw new Error(data.message);
  }

  return data.user;
};

export const registerUser = async (email, password, username) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, username }),
  });

  const data = await response.json();
  if (response.ok) {
    localStorage.setItem('token', data.token);
  } else {
    throw new Error(data.message);
  }

  return data.user;
};

export const getUser = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }

  const response = await fetch(`${API_URL}/user`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    localStorage.removeItem('token');
    return null;
  }

  const data = await response.json();
  return data.user;
};

export const logoutUser = async () => {
  localStorage.removeItem('token');
};
