import { useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";



export default function Login({setToken}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      setMessage('Fyll i både e-post och lösenord.');
      return;
    }
    try {
      const res = await axios.post("http://localhost:8080/login", {
        email,
        password,
      });

      const data = res.data;

      if (res.status === 200) {
        setMessage(data.message);
        localStorage.setItem("accessToken", data.token);
        localStorage.setItem("fullname", data.fullname);
        localStorage.setItem("_id", data._id);

        setToken(data.token);

        navigate("/account/profile"); 
      } else {
        setMessage(data.message || 'Inloggningen misslyckades.');
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("Internal server error");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="button" onClick={handleLogin}>
          Logga in
        </button>
      </form>
      <p>{message}</p>
      <p>Har du inget konto? Registrera dig <Link to="/register">här.</Link></p>
    </div>
  );
}
