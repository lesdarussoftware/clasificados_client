import { format } from "date-fns";

import { Pagination } from "./Pagination";

export function AdsContainer({ ads, count, page, setPage }) {
    return (
        <Pagination count={count} page={page} setPage={setPage}>
            <section className="adsContainer">
                {ads.map(ad => (
                    <div key={ad.id} className="ad">
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