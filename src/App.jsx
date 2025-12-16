// npm install react-router-dom
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import app from './firebase'
import { getAuth, signOut } from 'firebase/auth';

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/header";
import Hero from "./components/hero";
import Contenido from "./components/contenido";
import Footer from "./components/footer";

// Mis paginas
import Caracteristicas from "./pages/caracteristicas";
import Contacto from "./pages/contacto";
import ListaPeliculas from "./components/peliculas";
import Comunidad from "./components/comunidad";
import RutaPrivada from "./components/RutaPrivada";

import Login from "./components/Login";
import RegistrarCuenta from "./components/RegistrarCuenta";
import Nacionales from "./components/Nacionales";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Hero />
       <Routes>
  <Route path="/" element={<Contenido />} />

  
  {/* Albums (si también debe usar ListaPeliculas por ahora) */}
  <Route path="/albums" element={
    <>
      
      <ListaPeliculas />
      <Nacionales />

    </>
    } />

  <Route path="/contacto" element={<Contacto />} />

  <Route path="/iniciar-sesion" element={<Login/>} />
  <Route path="/registrarse" element={<RegistrarCuenta/>} />

  <Route
    path="/comunidad"
    element={
      <RutaPrivada>
        
      </RutaPrivada>
    }
  />
</Routes>


        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;