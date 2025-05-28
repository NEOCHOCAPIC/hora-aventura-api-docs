import { useState, useEffect } from "react";

function HeroSection({ total, shown, search, setSearch }) {
  const [input, setInput] = useState(search || "");

  
  useEffect(() => {
    setInput(search || "");
  }, [search]);

  const handleChange = (e) => {
    setInput(e.target.value);
    setSearch(e.target.value);
  };

  return (
    <section className="bg-[#232946] rounded-2xl shadow-lg px-8 py-10  max-w-xl text-center mt-8 mx-4">
      <h1 className="text-4xl md:text-5xl font-extrabold text-blue-300 flex items-center justify-center gap-2 mb-2">
        <span className="text-blue-200">Api de Hora de Aventura</span>
      </h1>
      <p className="text-blue-100 text-lg mb-6">Busca los personajes de hora de aventura</p>
      <div className="flex items-center bg-[#181825] border-2 border-blue-400 rounded-full px-4 py-2 mb-4 w-full max-w-md mx-auto">
        <span className="text-blue-400 text-xl mr-2">🔍</span>
        <input
          type="text"
          placeholder="buscar personajes..."
          className="bg-transparent outline-none text-blue-50 flex-1 placeholder-blue-300"
          value={input}
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-center gap-8 text-blue-300 text-base mt-2">
        <span className="flex items-center gap-1"><span role="img" aria-label="users">👥</span> {shown} mostrados / {total} personajes</span>
      </div>
    </section>
  );
}

export default HeroSection;
