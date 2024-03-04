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
                </div>
            ))}
        </section>
    )
}