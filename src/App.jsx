import { useState, useRef } from "react"
import { ID3Writer } from 'browser-id3-writer'
import { saveAs } from 'file-saver'
import { convertFileToBuffer } from 'id3-parser/lib/util'
import parse from 'id3-parser'
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { RiFolderDownloadLine } from "react-icons/ri";
import { Song } from "./components/Song.jsx"
import { createSongFromTag } from './lib/mp3'



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
    <div className='flex flex-col items-center p-4'> 
      <h1 className='m-4 text-5xl font-bold text-green'>MP3 Editor</h1>  
      <div className='m-4 flex'>
        <button className="w-32 p-2 flex items-center justify-evenly rounded bg-green text-white m-4 shadow-lg" onClick={uploadFile}>
          Upload
          <MdOutlineDriveFolderUpload className='ml-2 w-6 h-6'/>
        </button>
        <input type='file' accept='audio/mpeg' id='file' ref={songInput} onChange={handleFileChange} hidden></input>

        <button className="w-32 p-2 flex items-center justify-evenly rounded bg-green text-white m-4 shadow-lg" onClick={downloadSong}>
          Download
          <RiFolderDownloadLine className='ml-2 w-6 h-6'/>
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
  )
}

export default App
