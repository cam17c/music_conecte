import { useState } from "react";
import datos from "../data/peliculas.json";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

function ListaPeliculas() {

  const [busqueda, setBusqueda] = useState("");
  const [mostrarSugerencia, setMostrarSugerencia] = useState(false);
  const [sugerencia, setSugerencia] = useState("");
  const [enviando, setEnviando] = useState(false);

  // FILTRAR ARTISTAS
  const peliculasFiltradas = datos.peliculas.filter((peli) =>
    peli.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  // 🔥 ENVIAR SUGERENCIA A FIRESTORE
  const enviarSugerencia = async () => {
    if (!sugerencia.trim()) return alert("Escribe un nombre válido.");

    try {
      setEnviando(true);

      await addDoc(collection(db, "sugerenciasNacionales"), {
        nombre: sugerencia,
        fecha: serverTimestamp()
      });

      alert(`Gracias por sugerir: ${sugerencia}`);

      setSugerencia("");
      setMostrarSugerencia(false);

    } catch (error) {
      console.error("Error al enviar la sugerencia:", error);
      alert("Hubo un error al enviar la sugerencia.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-red-900 py-16 px-6">

      {/* TÍTULO PRINCIPAL */}
      <h1 className="text-center text-5xl font-extrabold mb-12 text-red-400 tracking-widest drop-shadow-lg">
        🌎 NACIONALES 🎵
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

      {/* ❌ MENSAJE + BOTÓN + FORMULARIO FIREBASE */}
      {peliculasFiltradas.length === 0 && (
        <div className="text-center text-gray-300 text-xl mt-10 flex flex-col items-center gap-4">

          <p>😕 No se encontró ningún artista con ese nombre.</p>

          {/* BOTÓN PARA ABRIR FORMULARIO */}
          <button
            onClick={() => setMostrarSugerencia(!mostrarSugerencia)}
            className="bg-red-500 text-white px-5 py-2 rounded-full 
                       hover:bg-red-400 transition font-semibold shadow-md"
          >
            ✨ Sugerir artista
          </button>

          {/* FORMULARIO */}
          {mostrarSugerencia && (
            <div className="mt-4 bg-gray-800/70 p-6 rounded-2xl border border-gray-600 w-full max-w-md shadow-lg">

              <p className="mb-3">📩 Ingresa el nombre del artista que deseas sugerir:</p>

              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-600 text-gray-200"
                placeholder="Ejemplo: Grupo 5"
                value={sugerencia}
                onChange={(e) => setSugerencia(e.target.value)}
              />

              <button
                onClick={enviarSugerencia}
                disabled={enviando}
                className="mt-4 bg-green-600 w-full py-2 rounded-lg font-bold hover:bg-green-500 transition disabled:opacity-50"
              >
                {enviando ? "Enviando..." : "Enviar sugerencia ✔"}
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
}

export default ListaPeliculas;
