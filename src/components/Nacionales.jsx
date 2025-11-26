import { useState } from "react";
import datos from "../data/nacionales.json";

function Nacionales() {

  const [busqueda, setBusqueda] = useState("");

  const peliculasFiltradas = datos.peliculas.filter((peli) =>
    peli.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

return (
  <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-red-900 py-16 px-6">

    {/* TÍTULO PRINCIPAL */}
    <h1 className="text-center text-5xl font-extrabold mb-12 text-red-400 tracking-widest drop-shadow-lg">
      🌎 INTERNACIONALES 🎵
    </h1>

    {/* BARRA DE BÚSQUEDA */}
    <div className="flex justify-center mb-10">
      <input
        type="text"
        placeholder="🔍 Busca tu artista favorito..."
        className="
          w-full max-w-xl px-6 py-3 rounded-full 
          bg-gray-900/60 backdrop-blur-sm
          border border-gray-700 
          text-gray-200 placeholder-gray-500
          shadow-lg 
          focus:outline-none focus:ring-2 focus:ring-red-500
        "
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
    </div>

    {/* GRID */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 max-w-7xl mx-auto">

      {peliculasFiltradas.map((p) => (
        <div
          key={p.id}
          className="
            bg-gray-900/70 backdrop-blur-sm
            rounded-3xl border border-gray-700
            shadow-lg hover:shadow-2xl 
            transition-all hover:-translate-y-1 
            overflow-hidden
          "
        >
          {/* IMAGEN */}
          <img
            src={`/${p.imagen}`}
            alt={p.titulo}
            className="w-full h-60 object-cover opacity-90 hover:opacity-100 transition"
          />

          {/* CONTENIDO */}
          <div className="p-6">
            <h2 className="text-2xl font-bold text-red-400">{p.titulo}</h2>

            {/* ÁLBUM */}
            <p className="text-gray-300 mt-1 text-sm flex items-center gap-2">
              🎵 <strong className="text-gray-200">Álbum:</strong> {p.album}
            </p>

            {/* BOTONES */}
            <div className="flex gap-3 mt-4">
              {p.spotify && (
                <a
                  href={p.spotify}
                  target="_blank"
                  className="
                    bg-green-600 text-white px-4 py-2 rounded-full 
                    font-semibold shadow-md hover:bg-green-500 
                    transition
                  "
                >
                  🎧 Spotify
                </a>
              )}

              {p.youtube && (
                <a
                  href={p.youtube}
                  target="_blank"
                  className="
                    bg-red-600 text-white px-4 py-2 rounded-full 
                    font-semibold shadow-md hover:bg-red-500 
                    transition
                  "
                >
                  ▶ YouTube
                </a>
              )}
            </div>

            <p className="mt-4 text-sm text-gray-300">
              📅 <strong className="text-gray-200">Año:</strong> {p.año}
            </p>

            <p className="text-sm text-gray-300 mt-1">
              🎧 <strong className="text-gray-200">Género:</strong> {p.genero}
            </p>

            <p className="italic text-gray-400 mt-4 text-sm">
              {p.sinopsis}
            </p>

            <p className="mt-4 font-bold text-yellow-400 text-lg">
              ⭐ {p.calificacion}/10
            </p>
          </div>
        </div>
      ))}

    </div>

    {/* MENSAJE SI NO HAY RESULTADOS */}
    {peliculasFiltradas.length === 0 && (
      <p className="text-center text-gray-300 text-xl mt-10">
        😕 No se encontró ningún artista con ese nombre.
      </p>
    )}
  </div>
);

}

export default Nacionales;
