import { format } from "date-fns";

import { Pagination } from "./Pagination";

import { handleOpen, setLocalDate } from "../utils/helpers";

export function AdsContainer({ ads, count, page, setPage, setView }) {
    return (
        <>
            <Pagination count={count} page={page} setPage={setPage}>
                {ads.length === 0 ?
                    <div className="no-content-text">No hay registros para mostrar.</div> :
                    <section className="adsContainer">
                        {ads.map(ad => (
                            <div key={ad.id} className="ad" onClick={() => {
                                handleOpen('view-ad')
                                setView(ad)
                            }}>
                                <p className="adContent">
                                    {ad.content}
                                </p>
                                <p className="adCategory">
                                    {ad.category.name}
                                </p>
                                <p className="adDate">
                                    {format(setLocalDate(ad.created_at), 'dd-MM-yy')}
                                </p>
                            </div>
                        ))}
                    </section>
                }
            </Pagination>
            <footer>Un producto de <a href="https://lesdarussoftware.github.io/web/" target="_blank" rel="noopener noreferrer">Lesdarus Software</a> &copy; | {new Date().getFullYear()}</footer>
        </>
    )
}