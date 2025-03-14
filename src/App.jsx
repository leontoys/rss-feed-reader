import { useState, useEffect } from 'react'
import ItemList from './components/ItemList'
import './App.css'
import { pipeline } from '@huggingface/transformers';

function App() {

  //Constants
  const defaultUrl = 'https://feeds.buzzsprout.com/2289931.rss'
  const proxyUrl = "https://api.allorigins.win/get" //'https://cors-anywhere.herokuapp.com/' 
  const defaultAudioUrl = 'https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/jfk.wav' 

  //State Variables
  const [url,setUrl] = useState("")
  const [items,setItems] = useState([])
 // Initialize the transcription pipeline
 const [transcriber, setTranscriber] = useState(null);  

  //load transcriber on page load
  useEffect(() => {
    const loadTranscriber = async () => {
      try {
        console.log('Loading transcriber...');
        const transcriberPipeline = await pipeline(
          'automatic-speech-recognition',
          'Xenova/whisper-tiny.en',
          {
            enableAdultContentFiltering: true // This is required for Whisper
          }
        );
        setTranscriber(transcriberPipeline);
        console.log('Transcriber loaded');
      } catch (error) {
        console.error('Error loading transcriber:', error);
      }
    };

    loadTranscriber();
  }, []);  

  // Download transcript
  const downloadTranscript = async (e) => {
    try {
      if (!transcriber) {
        console.error('Transcriber is not loaded yet');
        return;
      }

      console.log('Starting transcription...');
      const output = await transcriber(defaultAudioUrl);
      console.log('Transcription output:', output);
    } catch (error) {
      console.error('Error during transcription:', error);
      throw error;
    }
  };

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
      console.error(error)
    }
  }

  const handleClick = async (e)=>{
    //console.log(url||defaultUrl)
    //fetch the feed 
    const contents = await fetchRSSFeed(url||defaultUrl)
    console.log("contents",contents)
    //now we need to parse the feed
    const xml = new window.DOMParser().parseFromString(contents,'application/xml')
    //console.log("parsed",xml)
    const items_html = xml.getElementsByTagName("item")//HTML collection
    //console.log("items",items) - this is HTML collection
    const items_array = Array.from(items_html)
    //console.log("items array",items_array)
    setItems(items_array)//add items
    //TODO-clean up this - loop through the feeds
    //for(let i = 0; i < items_array.length; i++){
    //  console.log(items_array[i].getElementsByTagName("title")[0].textContent)
    //}
  }

  return (
      <div className="card">
        <h1>RSS Feed Reader</h1>
        <input type='text' value={url||defaultUrl} onChange={e=>setUrl(e.target.value)}></input>
        <button type='submit' onClick={handleClick}>Get Feeds</button>
        <ItemList items={items} onClick={downloadTranscript}/>
      </div>
  )
}

export default App
