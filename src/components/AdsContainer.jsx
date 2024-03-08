import { format } from "date-fns";

import { Pagination } from "./Pagination";

import { handleOpen } from "../utils/helpers";

export function AdsContainer({ ads, count, page, setPage, setView }) {
    return (
        <Pagination count={count} page={page} setPage={setPage}>
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
                            {format(new Date(ad.created_at), 'dd-MM-yy')}
                        </p>
                    </div>
                ))}
            </section>
        </Pagination>
    )
}