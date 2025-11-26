function Contenido() {
    return (
        <section
            id="caracteristicas"
            className="bg-gradient-to-r from-gray-900 via-gray-800 to-red-900 text-white py-20"
        >
            <div className="container mx-auto px-6 text-center">

                {/* Título */}
                <h3 className="text-4xl font-extrabold mb-12">
                    ¿Qué es <span className="text-red-400">Music Connection</span>?
                </h3>

                {/* Card única */}
                <div className="max-w-3xl mx-auto bg-gray-800/40 backdrop-blur-md p-10 rounded-3xl shadow-xl border border-gray-700 hover:border-red-500 transition">

                    {/* Icono musical */}
                    <div className="flex justify-center mb-6">
                        <div className="bg-red-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-lg">
                            🎧
                        </div>
                    </div>

                    {/* Contenido */}
                    <h4 className="text-2xl font-bold mb-4">Tu mundo de música en un solo lugar</h4>
                    
                    <p className="text-gray-300 text-lg leading-relaxed">
                        Music Connection es una plataforma diseñada para que disfrutes música variada
                        de todos los géneros, descubras nuevos artistas y explores álbumes completos
                        en una experiencia fluida, rápida y visualmente inmersiva.
                    </p>
                </div>

            </div>
        </section>
    );
}

export default Contenido;
