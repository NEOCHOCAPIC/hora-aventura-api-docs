
import NavBar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import CharactersGrid from "./components/CharactersGridSearch";
import LocationsGrid from "./components/LocationsGrid";
import Footer from "./components/Footer";
import Docs from "./components/Docs";

import { useState, useEffect } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const [shown, setShown] = useState(0);
  const [page, setPage] = useState("home");


  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      setPage(hash || "home");
    };
    window.addEventListener("hashchange", onHashChange);
    onHashChange();
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-[#181825] flex flex-col items-center justify-start pt-12">
        {page === "docs" ? (
          <Docs />
        ) : (
          <>
            <HeroSection total={total} shown={shown} search={search} setSearch={setSearch} />
            <CharactersGrid search={search} setTotal={setTotal} setShown={setShown} />
            <LocationsGrid />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
