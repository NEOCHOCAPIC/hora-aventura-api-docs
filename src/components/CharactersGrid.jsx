import { useEffect, useState } from "react";

function CharactersGrid() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://hora-aventura-api.vercel.app/api/personajes")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar personajes");
        return res.json();
      })
      .then((data) => {
        setCharacters(data.data); 
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-blue-200 mt-8">Loading...</div>;
  if (error) return <div className="text-red-400 mt-8">{error}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 w-full max-w-4xl mx-auto">
      {characters.map((char) => (
        <CharacterCard key={char.id} character={char} />
      ))}
    </div>
  );
}

function CharacterCard({ character }) {

  const mainSprite = character.sprites?.[0]?.url || "/src/assets/logo.png";
  return (
    <div className="bg-[#232946] rounded-xl shadow-md p-4 flex flex-col items-center text-center border border-blue-900 hover:scale-105 transition mx-4">
      <img
        src={mainSprite}
        alt={character.nombre}
        className="w-24 h-24 object-cover rounded-full mb-3 border-4 border-blue-400 bg-[#181825]"
      />
      <h3 className="text-lg font-bold text-blue-200 mb-1">{character.nombre}</h3>
      <p className="text-blue-100 text-xs mb-2 italic">{character.conocido_como}</p>
      <p className="text-blue-100 text-sm mb-2 line-clamp-3">{character.descripcion}</p>
      <div className="flex flex-wrap justify-center gap-2 mt-2 text-xs">
        <span className="bg-blue-900 text-blue-100 rounded-full px-2 py-1">Edad: {character.edad}</span>
        <span className="bg-blue-900 text-blue-100 rounded-full px-2 py-1">Sexo: {character.sexo}</span>
        <span className="bg-blue-900 text-blue-100 rounded-full px-2 py-1">Especie: {character.especie}</span>
      </div>
      <div className="flex flex-wrap justify-center gap-2 mt-2 text-xs">
        {character.ubicaciones?.map((loc) => (
          <span key={loc.id} className="bg-blue-700 text-blue-50 rounded px-2 py-1">{loc.nombre}</span>
        ))}
      </div>
    </div>
  );
}

export default CharactersGrid;
