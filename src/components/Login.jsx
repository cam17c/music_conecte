import { useState } from "react"
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup  } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const provider = new GoogleAuthProvider();

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    function iniciarSesion (){
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            // ...
            console.log("inicio de sesion exitoso");
            navigate("/");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Error al crear cuenta");
            console.log(error);
        });
    }

    function iniciarConGoogle() {
        const auth = getAuth();
        signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            // ...
            console.log("Iniciaste sesion con Google");
            navigate("/");
            
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
            console.log("Error con iniciar con Google");
            console.log(error);            
        });
    }


    return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-red-900 px-6">
    <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 shadow-2xl rounded-3xl p-10 w-full max-w-md">

      {/* TÍTULO */}
      <h1 className="text-4xl font-extrabold text-center text-red-400 mb-6 drop-shadow-lg">
        Iniciar Sesión
      </h1>

      <p className="text-center text-gray-300 mb-8">
        Bienvenido de vuelta a <span className="text-red-400 font-semibold">Music Connection</span>.
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

        {/* BOTÓN INICIAR SESIÓN */}
        <button
          onClick={iniciarSesion}
          className="
            bg-red-500 hover:bg-red-600
            text-white font-bold py-3 rounded-xl 
            shadow-lg shadow-red-900/40
            transition transform hover:-translate-y-1
          "
        >
          Iniciar Sesión
        </button>

        {/* BOTÓN GOOGLE */}
        <button
          onClick={iniciarConGoogle}
          className="
            bg-gray-800 hover:bg-gray-700 
            text-white font-bold py-3 rounded-xl 
            border border-gray-600
            shadow-md shadow-gray-900/30
            transition transform hover:-translate-y-1
          "
        >
          Continuar con Google ⭐
        </button>

      </div>
    </div>
  </div>
);


}
export default Login