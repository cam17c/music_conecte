import { Link } from "react-router-dom";

function NavbarVisitante() {
  return (
    <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-red-900 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">

        <h1 className="text-2xl font-extrabold">
          <span className="text-red-400">Mi</span>{" "}
          <span className="text-gray-200">Página</span>
        </h1>

        <nav>
          <ul className="flex items-center gap-8 text-lg">

            <li>
              <Link to="/" className="relative hover:text-red-400 transition">
                Inicio
                <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-red-400 scale-x-0 hover:scale-x-100 transition-transform origin-left"></span>
              </Link>
            </li>

            
            <li>
              <Link to="/albums" className="hover:text-red-400 transition">
                Albums
              </Link>
            </li>

            <li>
              <Link to="/comunidad" className="hover:text-red-400 transition">
                Comunidad
              </Link>
            </li>

            <li>
              <Link to="/contacto" className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-400 transition font-semibold shadow-md">
                Contacto
              </Link>
            </li>

            <li>
              <Link to="/iniciar-sesion" className="hover:text-red-400 transition">
                Iniciar sesión
              </Link>
            </li>

            <li>
              <Link to="/registrarse" className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-400 transition font-semibold shadow-md">
                Registrarse
              </Link>
            </li>

          </ul>
        </nav>

      </div>
    </header>
  );
}

export default NavbarVisitante;
