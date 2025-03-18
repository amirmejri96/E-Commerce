import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/userSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      // Sauvegarder le token dans localStorage
      localStorage.setItem("userToken", data.token);
      dispatch(login(data.user)); // Mettre à jour l'état de l'utilisateur
      navigate("/"); // Rediriger vers la page d'accueil
    } catch (error) {
      console.error("Erreur lors de la connexion", error.response.data);
    }
  };

  return (
    <div className="max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Connexion</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          className="w-full p-2 border border-gray-300"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full p-2 border border-gray-300"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white">
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
