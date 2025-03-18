import Header from "../../components/Header";
import Footer from "../../components/Footer";

const HomePage = () => {
  return (
    <>
      <Header />
      <main className="p-10">
        <h2 className="text-2xl font-bold">Bienvenue sur Chaises Store</h2>
        <p>Découvrez nos meilleures chaises pour votre confort !</p>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
