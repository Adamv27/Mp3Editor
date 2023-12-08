import React, {useState} from "react"
import placeHolder from "../assets/placeholder.png"

import './song.css'

export const Song = ({uploadImage, title, artist, album }) => {
  return(
    <div className='song-container'>
      <img src={placeHolder} onClick={uploadImage}/>

      <label>Title</label>
      <input type='text' defaultValue={title}></input>
      <label>Artist</label>
      <input type='text' defaultValue={artist}></input>
      <label>Album</label>
      <input type='text' defaultValue={album}></input>
    </div>
  )
}

