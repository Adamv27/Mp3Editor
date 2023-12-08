import React, { useState, useRef } from "react"
import placeHolder from "../assets/placeholder.png"
import { getImageUrlFromBuffer } from "../lib/mp3"

import './song.css'

export const Song = ({updateDisplayedSong, title, artist, album, image }) => {

  let imageInput = useRef(null);
  
  const uploadImage = () => {
    imageInput.current.click();    
  }

  const handleImageChange = async (event) => {
    const image = event.target.files[0];
    let arrayBuffer = await image.arrayBuffer();
    let arrayBufferView = new Uint8Array(arrayBuffer);
    let data = {
      url: getImageUrlFromBuffer(arrayBufferView),
      data: arrayBufferView
    }
    updateDisplayedSong("image", data);
  }


  return(
    <div className='song-container'>
      <img src={image != null ? image : placeHolder} onClick={uploadImage}/>

      <label>Title</label>
      <input 
        type='text' 
        defaultValue={title} 
        onChange={(e) => updateDisplayedSong('title', e.target.value)}
      />
      <label>Artist</label>
      <input 
        type='text' 
        defaultValue={artist}
        onChange={(e) => updateDisplayedSong('artist', e.target.value)}
      />
      <label>Album</label>
      <input 
        type='text' 
        defaultValue={album}
        onChange={(e) => updateDisplayedSong('album', e.target.value)}
      />
      <input type='file' accept='png/jpeg' ref={imageInput} onChange={handleImageChange} hidden></input>
    </div>
  )
}

