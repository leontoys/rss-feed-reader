const ItemList = ({ items }) => {
    if(items){
        console.log(items[0].getElementsByTagName("enclosure")[0].getAttribute("url"))
    }
    return (
        <div className="item-list">
        {
            items.map(item => (
                <div id={item.getElementsByTagName("guid")[0].textContent} className="item">
                    <h2>{item.getElementsByTagName("title")[0].textContent}</h2>
                    <p>{item.getElementsByTagName("itunes:summary")[0].textContent}</p>
                    <audio controls src={item.getElementsByTagName("enclosure")[0].getAttribute("url")}></audio>
                </div>
            ))
        }
       </div> 
    )
}

export default ItemList