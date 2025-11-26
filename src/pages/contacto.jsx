function Contacto() {
    return (
        <section id="contacto" className="bg-gray-100 py-16 px-6">
            <div className="max-w-4xl mx-auto">
                
                <h3 className="text-3xl font-bold text-gray-800 mb-4 text-center">
                    Contacto
                </h3>

                <p className="text-gray-600 text-center mb-10">
                    ¿Tienes alguna pregunta? ¡Nos encantaría saber de ti! Completa el formulario y te responderemos a la brevedad.
                </p>

                {/* Formulario */}
                <form className="bg-white shadow-md rounded-xl p-8 mb-12">
                    <div className="mb-6">
                        <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                            Nombre:
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                            Correo electrónico:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                            Mensaje:
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows="5"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700 transition"
                    >
                        Enviar
                    </button>
                </form>

                {/* Información de contacto */}
                <div className="bg-white shadow-sm rounded-xl p-8">
                    <h4 className="text-xl font-semibold text-gray-800 mb-4">
                        Otras formas de contactarnos:
                    </h4>

                    <ul className="text-gray-600 space-y-2">
                        <li>📞 Teléfono: +34 123 456 789</li>
                        <li>✉️ Email: contacto@mipagina.com</li>
                        <li>📍 Dirección: Calle Falsa 123, Ciudad, País</li>
                    </ul>
                </div>

            </div>
        </section>
    );
}

export default Contacto;
