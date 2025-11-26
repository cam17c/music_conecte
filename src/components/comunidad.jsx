import { useEffect, useRef, useState } from 'react'
import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth'
import { db } from '../firebase'
import {
    collection,
    addDoc,
    onSnapshot,
    query,
    orderBy,
    updateDoc,
    deleteDoc,
    doc,
    serverTimestamp,
} from 'firebase/firestore'

function Comunidad() {
    // usuario
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [foto, setFoto] = useState('')
    const [uid, setUid] = useState('')
    const [cargando, setCargando] = useState(true)

    // editar perfil
    const [nuevoNombre, setNuevoNombre] = useState('')
    const [nuevaFoto, setNuevaFoto] = useState('')

    // posts
    const [contenidoPost, setContenidoPost] = useState('')
    const [posts, setPosts] = useState([])

    // editar post
    const [editandoID, setEditandoID] = useState(null)
    const [nuevoContenido, setNuevoContenido] = useState('')

    // comentarios
    const [comentariosPorPost, setComentariosPorPost] = useState({})
    const [inputComentarioPorPost, setInputComentarioPorPost] =
        useState({})

    const auth = getAuth()
    const comentariosUnsubsRef = useRef({})

    // formatear fecha
    const formatearFecha = (fecha) => {
        if (!fecha) return ''
        if (fecha.toDate) fecha = fecha.toDate()
        return fecha.toLocaleDateString('es-PE', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    // detectar usuario
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUid(user.uid)
                setEmail(user.email)
                setNombre(user.displayName || 'Usuario sin nombre')
                setFoto(user.photoURL || '/user.webp')
                setNuevoNombre(user.displayName || '')
                setNuevaFoto(user.photoURL || '')
            } else {
                setUid('')
                setEmail('')
                setNombre('')
                setFoto('')
            }
            setCargando(false)
        })

        return () => unsubscribe()
    }, [])

    // escuchar posts
    useEffect(() => {
        const q = query(collection(db, 'posts'), orderBy('fecha', 'desc'))
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const lista = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
            setPosts(lista)
        })

        return () => unsubscribe()
    }, [])

    // escuchar comentarios por post
    useEffect(() => {
        posts.forEach((p) => {
            if (comentariosUnsubsRef.current[p.id]) return

            const q = query(
                collection(db, 'posts', p.id, 'comentarios'),
                orderBy('fecha', 'asc'),
            )
            const unsub = onSnapshot(q, (snap) => {
                const lista = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
                setComentariosPorPost((prev) => ({ ...prev, [p.id]: lista }))
            })

            comentariosUnsubsRef.current[p.id] = unsub
        })

        return () => {
            Object.values(comentariosUnsubsRef.current).forEach((unsub) => unsub())
        }
    }, [posts])

    // actualizar perfil
    const actualizarPerfil = async () => {
        const user = auth.currentUser
        if (!user) return alert('No hay un usuario activo')

        try {
            await updateProfile(user, {
                displayName: nuevoNombre || user.displayName,
                photoURL: nuevaFoto || user.photoURL,
            })

            alert('Perfil actualizado')
            setNombre(nuevoNombre || user.displayName)
            setFoto(nuevaFoto || user.photoURL)
        } catch (err) {
            console.error(err)
            alert('Error al actualizar: ' + err.message)
        }
    }

    // crear post
    const crearPost = async () => {
        if (contenidoPost.trim() === '') return
        await addDoc(collection(db, 'posts'), {
            contenido: contenidoPost,
            fecha: serverTimestamp(),
            autor: nombre,
            autorFoto: foto,
            autorUid: uid,
            likes: [],
        })
        setContenidoPost('')
    }

    // like
    const toggleLike = async (post) => {
        const ref = doc(db, 'posts', post.id)
        const actuales = post.likes || []
        const nuevos = actuales.includes(uid)
            ? actuales.filter((id) => id !== uid)
            : [...actuales, uid]
        await updateDoc(ref, { likes: nuevos })
    }

    // guardar edición de post
    const guardarEdicion = async (id) => {
        await updateDoc(doc(db, 'posts', id), { contenido: nuevoContenido })
        setEditandoID(null)
    }

    // eliminar post
    const eliminarPost = async (id) => {
        if (!confirm('¿Eliminar este post?')) return
        await deleteDoc(doc(db, 'posts', id))
    }

    // agregar comentario
    const agregarComentario = async (postId) => {
        const texto = (inputComentarioPorPost[postId] || '').trim()
        if (!texto) return

        await addDoc(collection(db, 'posts', postId, 'comentarios'), {
            texto,
            autor: nombre,
            autorFoto: foto,
            autorUid: uid,
            fecha: serverTimestamp(),
        })

        setInputComentarioPorPost((prev) => ({ ...prev, [postId]: '' }))
    }

    // editar comentario
    const editarComentario = async (postId, comentario) => {
        const nuevoTexto = prompt('Editar comentario:', comentario.texto)
        if (!nuevoTexto || nuevoTexto.trim() === '') return

        await updateDoc(
            doc(db, 'posts', postId, 'comentarios', comentario.id),
            { texto: nuevoTexto },
        )
    }

    // eliminar comentario
    const eliminarComentario = async (postId, comentario) => {
        if (!confirm('¿Eliminar comentario?')) return

        await deleteDoc(doc(db, 'posts', postId, 'comentarios', comentario.id))
    }

    if (cargando) return <p className="text-center mt-10">Cargando...</p>

    return (
        <div className="p-8 max-w-3xl mx-auto bg-gray-50 min-h-screen">

            {/* perfil */}
            <div className="text-center mb-8">
                <img
                    className="w-20 h-20 rounded-full mx-auto border-4 border-red-500 shadow"
                    src={foto}
                    alt="foto"
                />
                <h1 className="text-3xl font-bold mt-3 text-red-600">
                    Bienvenido a la comunidad
                </h1>
                <p className="text-lg text-gray-700">
                    Hola, <strong className="text-red-600">{nombre}</strong>
                </p>
                <p className="text-gray-500">{email}</p>
            </div>

            <hr className="my-6 border-gray-300" />

            {/* editar perfil */}
            <h2 className="text-xl font-bold mb-2 text-gray-700">Editar mis datos</h2>

            <input
                type="text"
                placeholder="Nuevo nombre"
                value={nuevoNombre}
                onChange={(e) => setNuevoNombre(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full mb-3 focus:outline-none focus:border-red-500"
            />

            <input
                type="text"
                placeholder="URL nueva foto"
                value={nuevaFoto}
                onChange={(e) => setNuevaFoto(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full mb-3 focus:outline-none focus:border-red-500"
            />

            <button
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded w-full mb-6 shadow"
                onClick={actualizarPerfil}
            >
                Guardar cambios
            </button>

            <hr className="my-6 border-gray-300" />

            {/* crear post */}
            <h2 className="text-xl font-bold mb-2 text-gray-700">Crear publicación</h2>

            <textarea
                placeholder="¿Qué estás pensando?"
                value={contenidoPost}
                onChange={(e) => setContenidoPost(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded mb-3 focus:outline-none focus:border-red-500"
            />

            <button
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded w-full mb-6 shadow"
                onClick={crearPost}
            >
                Publicar
            </button>

            <hr className="my-6 border-gray-300" />

            {/* posts */}
            <h2 className="text-xl font-bold mb-4 text-gray-700">Publicaciones</h2>

            <div className="space-y-6">
                {posts.map((post) => {
                    const comentarios = comentariosPorPost[post.id] || []
                    const liked = (post.likes || []).includes(uid)

                    
                })}
            </div>
        </div>
    )
}

export default Comunidad
