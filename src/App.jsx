import { useState } from "react"
import { Song } from "./components/Song.jsx"

import './App.css'


function App() {
  const [MP3Data, setMP3Data] = useState({});

  return (
    <div className='page'>
      <div className='songContainer'> 
        <h1>MP3 Editor</h1>  
        <button>Upload</button>
        <button>Download</button>
        
        <Song />

      </div>
    </div>
  )
}

export default App
