import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

import { AuthContext } from "../providers/AuthProvider"
import { useApi } from "../hooks/useApi"
import { useForm } from "../hooks/useForm"

import { STATUS_CODES } from "../utils/statusCodes"
import { AUTH_URL } from "../utils/urls"

export function Login() {

    const { auth, setAuth } = useContext(AuthContext)

    const navigate = useNavigate()
    const { post } = useApi(`${AUTH_URL}/login`)
    const { handleChange, disabled, errors, formData, validate, setDisabled } = useForm({
        defaultData: {
            username: '',
            password: ''
        },
        rules: {
            username: {
                required: true,
                maxLength: 55
            },
            password: {
                required: true,
                minLength: 8,
                maxLength: 255
            }
        }
    })

    useEffect(() => {
        if (auth) navigate('/admin/avisos')
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (validate()) {
            const { status, data } = await post(formData)
            if (status === STATUS_CODES.OK) {
                setAuth(data)
                localStorage.setItem('auth', JSON.stringify(data))
                navigate('/admin/avisos')
            } else {
                setDisabled(false)
                toast.error(data.message)
            }
        }
    }
    return (
        <div className="loginContainer">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Usuario</label>
                    <input type="text" name="username" id="username" value={formData.username} onChange={handleChange} />
                    {errors.username?.type === 'required' && <small>* El nombre de usuario es requerido.</small>}
                    {errors.username?.type === 'maxLength' && <small>* El nombre de usuario es demasiado largo.</small>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} />
                    {errors.password?.type === 'required' && <small>* La contraseña es requerida.</small>}
                    {errors.password?.type === 'minLength' && <small>* La contraseña es demasiado corta.</small>}
                    {errors.password?.type === 'maxLength' && <small>* La contraseña es demasiado larga.</small>}
                </div>
                <div className="form-footer">
                    <button type="submit" disabled={disabled}>
                        Entrar
                    </button>
                    <button type="button" className="cancel-button" onClick={() => navigate('/')}>
                        Volver al inicio
                    </button>
                </div>
            </form>
        </div>
    )
}