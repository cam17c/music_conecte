import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../firebase';

import NavbarVisitante from './navbarVisitante';
import NavbarUsuario from './navbarUsuario';


function Header() {
    const [usuario, setUsuario] = useState(null);
    const auth = getAuth(app);

    useEffect(()=>{
        //Detectar usuario
        const detectarUsuario = onAuthStateChanged(auth, (user)=>{
            if (user) {
                setUsuario(user);
            } else {
                setUsuario(null);
            }
        });
        return () => detectarUsuario();
    })

    if (usuario) {
        return <NavbarUsuario />
    }else{
        return <NavbarVisitante />
    }
}

export default Header;