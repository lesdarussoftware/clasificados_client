import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdDelete, MdEdit, MdAdd } from "react-icons/md";
import toast from "react-hot-toast";

import { AuthContext } from "../providers/AuthProvider";
import { useUsers } from "../hooks/useUsers";
import { useForm } from "../hooks/useForm";
import { useApi } from "../hooks/useApi";

import { AdminLayout } from "../components/AdminLayout";
import { Table } from "../components/Table";
import { Dialog } from "../components/Dialog";
import { Loader } from "../components/Loader";

import { USERS_URL } from "../utils/urls";
import { STATUS_CODES } from "../utils/statusCodes";
import { handleClose, handleOpen } from "../utils/helpers";

export function Users() {

    const { auth } = useContext(AuthContext)

    const navigate = useNavigate()
    const { users, setUsers, loadingUsers } = useUsers()
    const { formData, handleChange, validate, reset, setFormData, disabled, setDisabled, errors } = useForm({
        defaultData: {
            id: '',
            username: '',
            password: '',
            role: 'ADMIN'
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
            },
            role: {
                required: true
            }
        }
    })
    const { post, put, destroy } = useApi(USERS_URL)
    const [action, setAction] = useState(null)

    useEffect(() => {
        if (!auth) navigate('/admin')
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (validate()) {
            const { status, data } = action === 'NEW' ? await post(formData) : await put(formData)
            if (status === STATUS_CODES.OK) {
                if (action === 'NEW') setUsers([data, ...users])
                if (action === 'EDIT') setUsers([data, ...users.filter(u => u.id !== data.id)])
                handleClose('new-edit', setAction, reset)
                toast.success(`Usuario ${action === 'NEW' ? 'creado' : 'editado'} correctamente.`)
            } else {
                setDisabled(false)
                toast.error(data.message)
            }
        }
    }

    const handleDelete = async () => {
        const { status, data } = await destroy(formData)
        if (status === STATUS_CODES.OK) {
            setUsers([...users.filter(u => u.id !== data.id)])
            handleClose('delete', setAction, reset)
            toast.success('Usuario eliminado correctamente.')
        } else {
            setDisabled(false)
            toast.error(data.message)
        }
    }

    const columns = [
        {
            label: '#',
            accessor: 'id'
        },
        {
            label: 'Nombre de usuario',
            accessor: 'username'
        },
        {
            label: 'Rol',
            accessor: (row) => row.role.replace('_', ' ')
        },
        {
            label: '',
            accessor: (row) => (
                <>
                    <button
                        className="actions"
                        onClick={() => {
                            setFormData(row)
                            setAction('EDIT')
                            handleOpen('new-edit')
                        }}
                    >
                        <MdEdit />
                    </button>
                    <button
                        className="actions"
                        onClick={() => {
                            setFormData(row)
                            handleOpen('delete')
                        }}
                    >
                        <MdDelete />
                    </button>
                </>
            )
        }

    ]

    return (
        <AdminLayout>
            {disabled || loadingUsers ?
                <Loader /> :
                <>
                    <div className="adminPageHeader">
                        <h2>Usuarios</h2>
                        <button
                            className="addBtn"
                            onClick={() => {
                                setAction('NEW')
                                handleOpen('new-edit')
                            }}
                        >
                            <MdAdd />
                        </button>
                    </div>
                    <Dialog type="new-edit">
                        <h3>{action === 'NEW' ? 'Nuevo usuario' : `Editar el usuario #${formData.id}`}</h3>
                        <form>
                            <div className="form-group">
                                <label htmlFor="username">Nombre de usuario</label>
                                <input type="text" id="username" name="username" onChange={handleChange} value={formData.username} />
                                {errors.username?.type === 'required' && <small>* El nombre de usuario es requerido.</small>}
                                {errors.username?.type === 'maxLength' && <small>* El nombre de usuario es demasiado largo.</small>}
                            </div>
                            {action === 'NEW' &&
                                <div className="form-group">
                                    <label htmlFor="password">Contraseña</label>
                                    <input type="password" id="password" name="password" onChange={handleChange} value={formData.password} />
                                    {errors.password?.type === 'required' && <small>* La contraseña es requerida.</small>}
                                    {errors.password?.type === 'minLength' && <small>* La contraseña es demasiado corta.</small>}
                                    {errors.password?.type === 'maxLength' && <small>* La contraseña es demasiado larga.</small>}
                                </div>
                            }
                            <div className="form-group">
                                <label htmlFor="role">Rol</label>
                                <select name="role" id="role" value={formData.role} onChange={handleChange}>
                                    <option value="ADMIN">ADMIN</option>
                                    <option value="SUPER_ADMIN">SUPER ADMIN</option>
                                    <option value="USER">USER</option>
                                </select>
                                {errors.role?.type === 'required' && <small>* El rol es requerido.</small>}
                            </div>
                            <div className="form-footer">
                                <button type="button" className="cancel-button" onClick={() => handleClose('new-edit', setAction, reset)}>
                                    Cancelar
                                </button>
                                <button type="submit" onClick={handleSubmit} disabled={disabled}>
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </Dialog>
                    <Dialog type="delete">
                        <h3>¿Borrar el usuario {formData.username}?</h3>
                        <div className="form-footer">
                            <button type="submit" onClick={handleDelete}>
                                Confirmar
                            </button>
                            <button type="button" className="cancel-button" onClick={() => handleClose('delete', setAction, reset)}>
                                Cancelar
                            </button>
                        </div>
                    </Dialog>
                    <Table
                        columns={columns}
                        rows={users}
                        width="60%"
                    />
                </>
            }
        </AdminLayout>
    )
}