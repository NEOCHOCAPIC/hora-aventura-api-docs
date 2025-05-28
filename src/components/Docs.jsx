function Docs() {
  return (
    <section className="w-full max-w-3xl mx-auto mt-16 px-4">
      <h2 className="text-3xl font-bold text-blue-200 mb-6 text-center">Documentación de la API</h2>
      <div className="bg-[#232946] rounded-xl shadow-md p-6 text-blue-100">
        <h3 className="text-xl font-semibold text-blue-300 mb-2">¿Cómo usar la API?</h3>
        <p className="mb-4">
          La API de Hora de Aventura es pública y puedes consumirla desde cualquier cliente HTTP (fetch, axios, Postman, navegador, etc). No requiere autenticación.
        </p>
        <h3 className="text-lg font-semibold text-blue-200 mt-4 mb-2">Endpoints principales</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <span className="font-mono text-blue-300">GET /api/personajes</span><br/>
            <span className="ml-2 text-blue-100">Devuelve todos los personajes.</span>
          </li>
          <li>
            <span className="font-mono text-blue-300">GET /api/personajes/nombre?nombre=finn</span><br/>
            <span className="ml-2 text-blue-100">Devuelve personajes filtrados por nombre.</span>
          </li>
          <li>
            <span className="font-mono text-blue-300">GET /api/personajes/:id</span><br/>
            <span className="ml-2 text-blue-100">Devuelve un personaje por su ID.</span>
          </li>
          <li>
            <span className="font-mono text-blue-300">GET /api/ubicaciones</span><br/>
            <span className="ml-2 text-blue-100">Devuelve todas las ubicaciones.</span>
          </li>
          <li>
            <span className="font-mono text-blue-300">GET /api/ubicaciones/:id</span><br/>
            <span className="ml-2 text-blue-100">Devuelve una ubicación por su ID.</span>
          </li>
        </ul>
        <h3 className="text-lg font-semibold text-blue-200 mt-6 mb-2">Ejemplo de uso</h3>
        <pre className="bg-[#181825] rounded p-4 text-sm overflow-x-auto text-blue-100 mb-2">
{`fetch('https://hora-aventura-api.vercel.app/api/personajes')
  .then(res => res.json())
  .then(data => console.log(data));`}
        </pre>

      </div>
    </section>
  );
}

export default Docs;
