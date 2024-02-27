import { useState } from "react"

export function Filters() {

    const [show, setShow] = useState(true)

    const handleShow = () => {
        document.querySelector('.nav').classList.toggle('nav--active')
        setShow(!show)
    }

    return (
        <div className="filtersContainer">
            <nav className="nav">
                <ul className="navList">
                    <li className="navItem">
                        <label htmlFor="category_id">Categoría</label>
                        <select name="" id=""></select>
                    </li>
                    <li className="navItem">
                        <label htmlFor="province">Provincia</label>
                        <select name="" id=""></select>
                    </li>
                    <li className="navItem">
                        <label htmlFor="province">Ciudad</label>
                        <select name="" id=""></select>
                    </li>
                    <li className="navItem">
                        <label htmlFor="from">Desde</label>
                        <input type="date" name="" id="" />
                    </li>
                    <li className="navItem">
                        <label htmlFor="to">Hasta</label>
                        <input type="date" name="" id="" />
                    </li>
                    <li className="navItem">
                        <button>Reiniciar</button>
                        <button onClick={handleShow}>Aplicar</button>
                    </li>
                </ul>
                <p className="filtros" onClick={handleShow}>
                    {show ? 'MOSTRAR' : 'OCULTAR'} FILTROS
                </p>
            </nav>
        </div>
    )
}