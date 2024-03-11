import { format } from "date-fns";

import { Pagination } from "./Pagination";

import { handleOpen, setLocalDate } from "../utils/helpers";
import { FILE_URL } from "../utils/urls";

export function AdsContainer({ ads, count, page, setPage, setView }) {
    return (
        <>
            <Pagination count={count} page={page} setPage={setPage}>
                {ads.length === 0 ?
                    <div className="no-content-text">No hay registros para mostrar.</div> :
                    <section className="adsContainer">
                        {ads.map(ad => (
                            <>
                                {/* {ad.file.length > 0 ?
                                    <div key={ad.id} className="adImg" onClick={() => {
                                        handleOpen('view-ad')
                                        setView(ad)
                                    }}>
                                        <img src={`${FILE_URL + ad.file}.jpeg`} alt={`Imagen del aviso número ${ad.id}.`} />
                                    </div> : */}
                                    <div key={ad.id} className="ad" onClick={() => {
                                        handleOpen('view-ad')
                                        setView(ad)
                                    }}>
                                        <p className="adContent">
                                            {ad.content}
                                        </p>
                                        <p className="adCatAndDate">
                                            {format(setLocalDate(ad.created_at), 'dd-MM-yy') + ' / ' + ad.category.name}
                                        </p>
                                        {ad.promoted && <p className="promotedText">Promocionado</p>}
                                    </div>
                                {/* } */}
                            </>
                        ))}
                    </section>
                }
            </Pagination>
            <footer>Un producto de <a href="https://lesdarussoftware.github.io/web/" target="_blank" rel="noopener noreferrer">Lesdarus Software</a> &copy; | {new Date().getFullYear()}</footer>
        </>
    )
}