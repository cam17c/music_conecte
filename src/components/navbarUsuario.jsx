import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

function NavbarUsuario() {
  const auth = getAuth();

  const cerrarSesion = async () => {
    await signOut(auth);
  };

  return (
    <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-red-900 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">

        <h1 className="text-2xl font-extrabold">
          <span className="text-red-400">Music</span>{" "}
          <span className="text-gray-200">Connection</span>
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
              <Link to="/contacto" className="hover:text-red-400 transition">
                Contacto
              </Link>
            </li>

            <li>
              <button
                onClick={cerrarSesion}
                className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-400 transition font-semibold shadow-md"
              >
                Cerrar Sesión
              </button>
            </li>

          </ul>
        </nav>

      </div>
    </header>
  );
}

export default NavbarUsuario;
  