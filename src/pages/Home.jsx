import { Sidebar } from "../components/Sidebar";

export function Home() {
    return (
        <Sidebar childrenType="FILTROS">
            <li className="filterField">
                <label htmlFor="category_id">Categoría</label>
                <select name="" id=""></select>
            </li>
            <li className="filterField">
                <label htmlFor="province">Provincia</label>
                <select name="" id=""></select>
            </li>
            <li className="filterField">
                <label htmlFor="province">Ciudad</label>
                <select name="" id=""></select>
            </li>
            <li className="filterField">
                <label htmlFor="from">Desde</label>
                <input type="date" name="" id="" />
            </li>
            <li className="filterField">
                <label htmlFor="to">Hasta</label>
                <input type="date" name="" id="" />
            </li>
        </Sidebar>
    )
}