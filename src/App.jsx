import { useState, useEffect } from 'react'
import ItemList from './components/ItemList'
import './App.css'
import Notification from './components/Notification'

function App() {

  //Constants
  const defaultUrl = 'https://feeds.buzzsprout.com/2289931.rss'
  const proxyUrl = "https://api.allorigins.win/get" //'https://cors-anywhere.herokuapp.com/' 

  //State Variables
  const [url,setUrl] = useState("")
  const [items,setItems] = useState([]) 
  const [message,setMessage] = useState("")

  const fetchRSSFeed = async (url)=>{
    try {
    //wait for response
    const response = await fetch(`${proxyUrl}?url=${encodeURIComponent(url)}`)
    //console.log("response",response)
    //parse
    const json = await response.json()
    //console.log("json",json)
    //return contents
    return json.contents    
    } catch (error) {
      console.error("error",error.message)
      setMessage(error.message)
      setTimeout(()=>setMessage(""),2000)
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
    const items_html = xml.getElementsByTagName("item")//HTML collection
    //console.log("items",items) - this is HTML collection
    const items_array = Array.from(items_html)
    //console.log("items array",items_array)
    setItems(items_array)//add items
      
    } catch (error) {
      console.error("error",error)
      setMessage(error.message)
      setTimeout(()=>setMessage(""),2000)
    }
  }

  return (
      <div className="card">
        <h1>RSS Feed Reader</h1>
        <input type='text' value={url} onChange={e=>setUrl(e.target.value)}></input>
        <button type='submit' onClick={handleClick}>Get Feeds</button>
        <Notification message={message}></Notification>
        <ItemList items={items}/>
      </div>
  )
}

export default App
