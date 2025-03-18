import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">
        <Link to="/">Chaises Store</Link>
      </h1>
      <nav>
        <Link to="/cart" className="mx-4">🛒 Panier</Link>
        <Link to="/login" className="mx-4">🔑 Connexion</Link>
      </nav>
    </header>
  );
};

export default Header;
