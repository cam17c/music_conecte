import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function RegistrarCuenta() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //Funcionar para crear un usuario
    const registrar = async() => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log("Usuario registrado");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Error al crear tu cuenta");
            console.log(error);
        });
    }

return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-red-900 px-6">
    <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 shadow-2xl rounded-3xl p-10 w-full max-w-md">
      
      {/* TÍTULO */}
      <h1 className="text-4xl font-extrabold text-center text-red-400 mb-6 drop-shadow-lg">
        Crear Cuenta
      </h1>

      <p className="text-center text-gray-300 mb-8">
        Únete a <span className="text-red-400 font-semibold">Music Connection</span> y vibra con tus artistas favoritos.
      </p>

      <div className="flex flex-col gap-6">

        {/* EMAIL */}
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400 text-xl">
            ✉️
          </span>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              w-full pl-12 pr-4 py-3 rounded-xl 
              bg-gray-800 text-gray-200 placeholder-gray-500 
              border border-gray-700
              focus:outline-none focus:ring-2 focus:ring-red-500
            "
          />
        </div>

        {/* PASSWORD */}
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400 text-xl">
            🔒
          </span>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              w-full pl-12 pr-4 py-3 rounded-xl
              bg-gray-800 text-gray-200 placeholder-gray-500
              border border-gray-700
              focus:outline-none focus:ring-2 focus:ring-red-500
            "
          />
        </div>

        {/* BOTÓN */}
        <button
          onClick={registrar}
          className="
            bg-red-500 hover:bg-red-600
            text-white font-bold py-3 rounded-xl 
            shadow-lg shadow-red-900/40
            transition transform hover:-translate-y-1
          "
        >
          Crear Cuenta
        </button>

      </div>
    </div>
  </div>
);








}
export default RegistrarCuenta;