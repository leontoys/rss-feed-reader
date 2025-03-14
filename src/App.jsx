import { useState, useEffect } from 'react'
import ItemList from './components/ItemList'
import './App.css'
import Notification from './components/Notification'

function App() {

  //Constants
  const urls = [
    'https://feeds.buzzsprout.com/2289931.rss',
    'https://feeds.bbci.co.uk/news/rss.xml',
    'https://dev.to/feed/geekgalgroks'
  ]
  const proxyUrl = "https://api.allorigins.win/get" //'https://cors-anywhere.herokuapp.com/' 

  //State Variables
  const [url,setUrl] = useState(urls[0])
  const [items,setItems] = useState([]) 
  const [message,setMessage] = useState({message:null,className:""})


  const fetchRSSFeed = async (url)=>{
    try {
    //wait for response
    setMessage({message:"Fetching Items...",className:"info"})
    const response = await fetch(`${proxyUrl}?url=${encodeURIComponent(url)}`)
    //console.log("response",response)
    //parse
    const json = await response.json()
    setMessage({message:"",className:""})
    //console.log("json",json)
    //return contents
    return json.contents    
    } catch (error) {
      console.error("error-class",error.message)
      setMessage({message:error.message,className:"error"})
      setTimeout(()=> setMessage({message:"",className:""}),2000)
    }
  }

  const handleClick = async (e)=>{
    try {
    //console.log(url||defaultUrl)
    //fetch the feed 
    const contents = await fetchRSSFeed(url)
    console.log("contents",contents)
    //now we need to parse the feed
    const xml = new window.DOMParser().parseFromString(contents,'application/xml')
    //console.log("parsed",xml)
    console.log(xml.querySelector("title").textContent)
    const items_html = xml.getElementsByTagName("item")//HTML collection
    //console.log("items",items) - this is HTML collection
    const items_array = Array.from(items_html)
    //console.log("items array",items_array)
    setItems(items_array)//add items
      
    } catch (error) {
      console.error("error",error)
      setMessage({message:error.message,className:"error"})
      setTimeout(()=> setMessage({message:"",className:""}),2000)
    }
  }

  return (
      <div className="card">
        <h1>RSS Feed Reader</h1>
        <input type='text' value={url} 
               onChange={e=>setUrl(e.target.value)}></input>
        <button type='submit' onClick={handleClick}>Get Posts</button>
        <Notification message={message}></Notification>
        
        <ItemList items={items}/>
      </div>
  )
}

export default App
