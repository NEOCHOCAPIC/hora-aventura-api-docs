import { useEffect, useState } from "react";

function LocationsGrid() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://hora-aventura-api.vercel.app/api/ubicaciones")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar ubicaciones");
        return res.json();
      })
      .then((data) => {
        setLocations(data.data || []);
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
    <section className="w-full max-w-4xl mx-auto mt-16">
      <h2 className="text-2xl md:text-3xl font-bold text-blue-200 mb-8 text-center">Ubicaciones de Hora de Aventura</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {locations.map((loc) => (
          <LocationCard key={loc.id} location={loc} />
        ))}
      </div>
    </section>
  );
}

function LocationCard({ location }) {
  return (
    <div className="bg-[#232946] rounded-xl shadow-md p-5 flex flex-col items-center text-center border border-blue-900 hover:scale-105 transition mx-4">
      {location.imagen_url && (
        <img
          src={location.imagen_url}
          alt={location.nombre}
          className="w-28 h-28 object-cover rounded-lg mb-3 border-4 border-blue-400 bg-[#181825]"
        />
      )}
      <h3 className="text-lg font-bold text-blue-200 mb-1">{location.nombre}</h3>
      {location.descripcion && (
        <p className="text-blue-100 text-sm mb-2 line-clamp-3">{location.descripcion}</p>
      )}
    </div>
  );
}

export default LocationsGrid;
