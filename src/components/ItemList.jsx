const ItemList = ({ items , onClick }) => {
    return (
        <div className="item-list">
        {
            items.map(item => (
                <a href="#" key={item.getElementsByTagName("title")[0].textContent}>
                <div className="item">
                    <h2>{item.getElementsByTagName("title")[0].textContent}</h2>
                    <p>{item.getElementsByTagName("itunes:summary")[0].textContent}</p>
                    <audio controls src={item.getElementsByTagName("enclosure")[0].getAttribute("url")}></audio>
                    <br></br>
                    <button onClick={onClick}>Download Transcript</button>
                </div>
                </a>
            ))
        }
       </div> 
    )
}

export default ItemList