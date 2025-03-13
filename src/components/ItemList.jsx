const ItemList = ({ items }) => {
    return (
        <div>
        {
            items.map(item => (
                <div>
                    <p>{item.getElementsByTagName("title")[0].textContent}</p>
                </div>
            ))
        }
       </div> 
    )
}

export default ItemList