import { useCategories } from "../hooks/useCategories";
import { AdminLayout } from "../components/AdminLayout";
import { Table } from "../components/Table";

export function Categories() {

    const { categories } = useCategories()

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
                <button>Nueva</button>
            </div>
            <Table
                columns={columns}
                rows={categories}
            />
        </AdminLayout>
    )
}