import './caracteristicas.css'

function Caracteristicas() {
    return(
        <section className="features" id="caracteristicas">
            <div className="container">
                <h3>Características Destacadas</h3>
                <div className="feature-list">
                <div className="feature">
                    <h4>Rápido</h4>
                    <p>Carga rápida y optimizada para todos los dispositivos.</p>
                </div>
                <div className="feature">
                    <h4>Simple</h4>
                    <p>Diseño minimalista y fácil de mantener.</p>
                </div>
                <div className="feature">
                    <h4>Escalable</h4>
                    <p>Preparado para migrar a React u otros frameworks.</p>
                </div>
                <div className="feature">
                    <h4>Responsivo</h4>
                    <p>Adaptable a cualquier tamaño de pantalla y dispositivo.</p>
                </div>
                <div className="feature">
                    <h4>Accesible</h4>
                    <p>
                    Cumple con los estándares de accesibilidad para todos los
                    usuarios.
                    </p>
                </div>
                </div>

                <div className="more-info">
                <h3>¿Por qué elegirnos?</h3>
                <p>
                    Nuestro enfoque es entregar soluciones sencillas pero efectivas, que
                    se ajustan a las necesidades de tu proyecto y te permiten crecer con
                    flexibilidad y control total.
                </p>
                </div>
            </div>
        </section>
    )
}

export default Caracteristicas;