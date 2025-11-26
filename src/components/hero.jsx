import { Link } from 'react-router-dom';

function Hero() {
    return (
        <section
            className="bg-gradient-to-r from-gray-900 via-gray-800 to-red-900 text-white py-24"
            id="inicio"
        >
            <div className="container mx-auto text-center px-6">
                
                <h2 className="text-4xl font-extrabold mb-4">
                    🎶 Bienvenid@s a  <span className="text-red-400">Music Connection</span>
                </h2>

                <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                  Conoce más sobre tus artistas favoritos y vibra con su energía.
                </p>

                <Link
                    to="/contacto"
                    className="bg-red-500 hover:bg-red-400 transition px-8 py-3 text-lg font-semibold rounded-full shadow-lg"
                >
                    Contáctanos
                </Link>

            </div>
        </section>
    );
}

export default Hero;
