import { useCategories } from "../hooks/useCategories";
import { AdminLayout } from "../components/AdminLayout";
import { Table } from "../components/Table";
import { Dialog } from "../components/Dialog";
import { useState } from "react";

export function Categories() {

    const { categories } = useCategories()

    const handleOpen = () => {
        const dialog = document.querySelector('dialog')
        dialog.showModal()
    }

    const handleClose = () => {
        const dialog = document.querySelector('dialog')
        dialog.close()
    }

    const handleSubmit = () => {

    }

    const columns = [
        {
            label: '#',
            accessor: 'id'
        },
        {
            label: 'Nombre',
            accessor: 'name'
        },
        {
            label: 'Acción',
            accessor: (row) => <></>
        }
    ]

    return (
        <AdminLayout>
            <div className="adminPageHeader">
                <h2>Categorías</h2>
                <button onClick={handleOpen}>Nueva</button>
            </div>
            <Dialog open={open === 'NEW' || open === 'EDIT'}>
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Nombre</label>
                        <input type="text" id="name" name="name" />
                    </div>
                    <div className="form-footer">
                        <button type="button" className="cancel-button" onClick={handleClose}>
                            Cancelar
                        </button>
                        <button type="button" onClick={handleSubmit}>
                            Guardar
                        </button>
                    </div>
                </form>
            </Dialog>
            <Table
                columns={columns}
                rows={categories}
            />
        </AdminLayout>
    )
}