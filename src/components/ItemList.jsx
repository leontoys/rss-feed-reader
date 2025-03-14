const ItemList = ({ items, onClick }) => {
    return (
        <div className="item-list">
            {items.map(item => {
                const link = item.getElementsByTagName("link")[0]?.textContent || '';
                const guid = item.getElementsByTagName("guid")[0]?.textContent || '';
                const title = item.getElementsByTagName("title")[0]?.textContent || '';
                const summary = item.getElementsByTagName("itunes:summary")[0]?.textContent || '';
                const enclosureElement = item.getElementsByTagName("enclosure")[0];
                const enclosureUrl = enclosureElement?.getAttribute("url") || '';
                const description = item.getElementsByTagName("description")[0]?.textContent || '';

                return (
                    <a href={link} key={guid} onClick={onClick}>
                        <div className="item">
                            <h2>{title}</h2>
                            {(summary) && <p>{summary}</p>}
                            {enclosureUrl && (
                                <audio controls>
                                    <source src={enclosureUrl} type="audio/mp3" />
                                    Your browser does not support the audio element.
                                </audio>
                            )}
                        </div>
                    </a>
                );
            })}
        </div>
    );
};

export default ItemList;