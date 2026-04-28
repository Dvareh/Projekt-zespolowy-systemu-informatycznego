const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getBooks = async (page: number = 0, size: number = 12) => {
  const res = await fetch(
    `${API_URL}/books/get/page?page=${page}&size=${size}`,
    { headers: { 'Content-Type': 'application/json' } }
  );
  if (!res.ok) throw new Error('Error fetching books');
  return res.json();
};

export const loginUser = async (email: string, password: string) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error('Nieprawidłowy email lub hasło.');
  return res.json();
};

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });
  if (!res.ok) throw new Error('Błąd rejestracji. Spróbuj ponownie.');
  return res.json();
};

export const getMyProfile = async (token: string) => {
  const res = await fetch(`${API_URL}/user/me/get`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Error fetching profile');
  return res.json();
};
