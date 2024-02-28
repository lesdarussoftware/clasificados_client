import { useState } from "react"

export function Sidebar({ children, childrenType }) {

    const [show, setShow] = useState(true)

    const handleShow = () => {
        document.querySelector('.nav').classList.toggle('nav--active')
        setShow(!show)
    }

    return (
        <div className="sidebarContainer">
            <nav className="nav">
                <ul className="navList">
                    {children}
                    {childrenType === 'FILTROS' &&
                        <li className="filterField">
                            <button>Reiniciar</button>
                            <button onClick={handleShow}>Aplicar</button>
                        </li>
                    }
                </ul>
                <p className="sideText" onClick={handleShow}>
                    {`${show ? 'MOSTRAR' : 'OCULTAR'} ${childrenType}`}
                </p>
            </nav>
        </div>
    )
}