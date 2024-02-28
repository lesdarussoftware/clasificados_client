import { useNavigate } from "react-router-dom";

import { Sidebar } from "./Sidebar";

export function AdminLayout({ children }) {

    const navigate = useNavigate()

    return (
        <>
            <Sidebar childrenType="NAVEGACIÓN">
                <li className="navItem" onClick={() => navigate('/admin/avisos')}>Avisos</li>
                <li className="navItem" onClick={() => navigate('/admin/categorias')}>Categorías</li>
                <li className="navItem" onClick={() => navigate('/admin/usuarios')}>Usuarios</li>
                <li className="navItem">Salir</li>
            </Sidebar>
            {children}
        </>
    )
}