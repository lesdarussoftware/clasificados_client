import { format } from "date-fns";

export function AdsContainer({ ads }) {
    return (
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
    )
}