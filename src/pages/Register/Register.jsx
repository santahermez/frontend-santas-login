import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (!fullname || !username || !email || !password) {
      return;
    }

    try {
      const res = await axios.post('http://localhost:8080/user/register', {
        fullname,
        username,
        email,
        password,
      });

      const data = res.data;
      console.log(data.status)

      if (res.status === 200) {
        setMessage(data.message);
        navigate('/login');
        return;
      }
      setMessage(data.message);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="container">
      <Link to="/">Hem</Link>
      <h1>Registrera dig</h1>

      <form>
        <label htmlFor="fullname">Namn</label>
        <input
          type="text"
          name="fullname"
          required={true}
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />

        <label htmlFor="username">Användarnamn</label>
        <input
          type="text"
          name="username"
          required={true}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          required={true}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Lösenord</label>
        <input
          type="password"
          name="password"
          required={true}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="button" onClick={handleRegistration}>Registrera</button>
      </form>
      
      <h1>{message}</h1>
      <Link to="/login">Redan medlem?</Link>
    </div>
  );
}