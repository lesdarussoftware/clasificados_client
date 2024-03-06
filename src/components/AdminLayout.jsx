import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../providers/AuthProvider";

import { Sidebar } from "./Sidebar";

export function AdminLayout({ children }) {

    const { setAuth } = useContext(AuthContext)

    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('auth')
        setAuth(null)
        navigate('/admin')
    }

    return (
        <>
            <Sidebar childrenType="NAVEGACIÓN">
                <li className="navItem" onClick={() => navigate('/admin/avisos')}>Avisos</li>
                <li className="navItem" onClick={() => navigate('/admin/categorias')}>Categorías</li>
                <li className="navItem" onClick={() => navigate('/admin/usuarios')}>Usuarios</li>
                <li className="navItem" onClick={logout}>Salir</li>
            </Sidebar>
            <div className="adminContainer">
                {children}
            </div>
        </>
    )
}