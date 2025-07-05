import { useEffect, useState } from "react";

function CharactersGrid({ search, setTotal, setShown }) {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {

    fetch("https://hora-aventura-api.vercel.app/api/personajes?limit=50")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar personajes");
        return res.json();
      })
      .then((data) => {
        setCharacters(data.data);
        setTotal && setTotal(data.pagination?.total || data.data.length);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });

  }, [setTotal]);

  const filtered = characters.filter((char) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      char.nombre?.toLowerCase().includes(q) ||
      char.nombre_completo?.toLowerCase().includes(q) ||
      char.conocido_como?.toLowerCase().includes(q)
    );
  });

  
  const totalPages = search ? 1 : Math.ceil(characters.length / itemsPerPage);
  const startIndex = search ? 0 : (currentPage - 1) * itemsPerPage;
  const endIndex = search ? filtered.length : startIndex + itemsPerPage;
  const displayedCharacters = search ? filtered : characters.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    setShown && setShown(search ? filtered.length : displayedCharacters.length);
  
  }, [filtered.length, displayedCharacters.length, search]);

  if (loading) return <div className="text-blue-200 mt-8">Loading...</div>;
  if (error) return <div className="text-red-400 mt-8">{error}</div>;

  return (
    <div className="w-full max-w-6xl mx-auto">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {displayedCharacters.map((char) => (
          <CharacterCard key={char.id} character={char} />
        ))}
      </div>

  
      {!search && totalPages > 1 && (
        <div className="flex flex-col items-center mt-12 mb-8 space-y-4">
          {/* Page Info */}
          <div className="text-blue-200 text-sm">
            Página {currentPage} de {totalPages} 
            <span className="text-blue-300 ml-2">
              (Mostrando {displayedCharacters.length} de {characters.length} personajes)
            </span>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center space-x-2">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                currentPage > 1
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              ← Anterior
            </button>

            {/* Page Numbers */}
            <div className="flex items-center space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(page => {
                  // Show current page, first page, last page, and pages around current
                  return page === 1 || 
                         page === totalPages || 
                         (page >= currentPage - 1 && page <= currentPage + 1);
                })
                .map((page, index, arr) => {
                
                  const showEllipsis = index > 0 && page - arr[index - 1] > 1;
                  
                  return (
                    <div key={page} className="flex items-center">
                      {showEllipsis && (
                        <span className="px-2 text-blue-300">...</span>
                      )}
                      <button
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          page === currentPage
                            ? 'bg-blue-500 text-white shadow-md'
                            : 'bg-[#232946] text-blue-200 hover:bg-blue-600 hover:text-white border border-blue-800'
                        }`}
                      >
                        {page}
                      </button>
                    </div>
                  );
                })}
            </div>

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                currentPage < totalPages
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              Siguiente →
            </button>
          </div>

          {/* Quick Jump (for many pages) */}
          {totalPages > 5 && (
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-blue-200">Ir a página:</span>
              <input
                type="number"
                min="1"
                max={totalPages}
                value={currentPage}
                onChange={(e) => {
                  const page = parseInt(e.target.value);
                  if (page >= 1 && page <= totalPages) {
                    handlePageChange(page);
                  }
                }}
                className="w-16 px-2 py-1 rounded bg-[#232946] text-blue-200 border border-blue-800 text-center focus:outline-none focus:border-blue-500"
              />
            </div>
          )}
        </div>
      )}

      {/* Search Results Info */}
      {search && (
        <div className="text-center mt-8 text-blue-200">
          {filtered.length > 0 ? (
            <p>Se encontraron {filtered.length} personajes que coinciden con "{search}"</p>
          ) : (
            <p>No se encontraron personajes que coincidan con "{search}"</p>
          )}
        </div>
      )}
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
