import { useState, useRef } from "react"
import { Song } from "./components/Song.jsx"
import { ID3Writer } from 'browser-id3-writer'
import { convertFileToBuffer, fetchFileAsBuffer } from 'id3-parser/lib/util'
import parse from 'id3-parser'

import './App.css'


function App() {
  const [writer, setWriter] = useState();
  const [displayedSong, setDisplayedSong] = useState({title: '', artist: '', album: ''});

  let inputRef = useRef(null);
  

  const uploadImage = () => {
    console.log('test')   
  }


  const uploadFile = () => {
    inputRef.current.click();
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    convertFileToBuffer(file).then(parse).then(tag => {
      setDisplayedSong({
        title: tag.title,
        artist: tag.artist,
        album: tag.album
      })
    })

  }
  

  return (
    <div className='page'>
      <div className='songContainer'> 
        <h1>MP3 Editor</h1>  
        <div className='button-container'>
          <button className="input-button" onClick={uploadFile}>Upload</button>
          <input type='file' accept='audio/mpeg' id='file' ref={inputRef} onChange={handleFileChange} hidden></input>
          <button className="input-button">Download</button>
        </div> 
        <Song
          uploadImage={() => uploadImage()}
          title={displayedSong.title}
          artist={displayedSong.artist}
          album={displayedSong.album}
        />

      </div>
    </div>
  )
}

export default App
