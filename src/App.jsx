import { useState, useRef } from "react"
import { ID3Writer } from 'browser-id3-writer'
import { saveAs } from 'file-saver'
import { convertFileToBuffer } from 'id3-parser/lib/util'
import parse from 'id3-parser'

import { Song } from "./components/Song.jsx"
import { createSongFromTag } from './lib/mp3'
import uploadIcon from "./assets/upload.svg"
import downloadIcon from "./assets/download.svg"

import './App.css'


function App() {
  const [writer, setWriter] = useState();
  const [displayedSong, setDisplayedSong] = useState({title: '', artist: '', album: '', image: {url: null, data: []}});

  let songInput = useRef(null);

  const updateDisplayedSong = (field, value) => {
    setDisplayedSong({
      ...displayedSong,
      [field]: value
    })
  }

  const uploadFile = () => {
    songInput.current.click();
  }

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
 
    convertFileToBuffer(file)
    .then(buffer => {
      setWriter(new ID3Writer(buffer));
      return buffer;
    })
    .then(parse)
    .then(tag => setDisplayedSong(createSongFromTag(tag)))
  }

  const downloadSong = () => {
    if (writer == null) return;
    
    writer
      .setFrame('TIT2', displayedSong.title)
      .setFrame('TPE2', displayedSong.artist)
      .setFrame('TPE1', [displayedSong.artist])
      .setFrame('TALB', displayedSong.album)
      .setFrame('APIC', {
        type: 3,
        data: displayedSong.image.data,
        description: 'Album Cover'
      });
    writer.addTag();
    const taggedSongBuffer = writer.arrayBuffer;
    const blob = writer.getBlob();
    const url = writer.getURL();
    
    saveAs(blob, displayedSong.title + '.mp3');
    
    URL.revokeObjectURL(url);
    writer.revokeURL();
  }

  return (
    <div className='page'>
      <div className='mp3-container'> 
        <h1>MP3 Editor</h1>  
        <div className='button-container'>
          <button className="input-button" onClick={uploadFile}>
            Upload
          </button>
          <input type='file' accept='audio/mpeg' id='file' ref={songInput} onChange={handleFileChange} hidden></input>

          <button className="input-button" onClick={downloadSong}>
            Download
          </button>
        </div> 
        <Song
          updateDisplayedSong={updateDisplayedSong}
          title={displayedSong.title}
          artist={displayedSong.artist}
          album={displayedSong.album}
          image={displayedSong.image.url}
        />
      </div>
    </div>
  )
}

export default App
