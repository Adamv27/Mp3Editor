import React, { useState, useRef } from "react"
import placeHolder from "../assets/placeholder.png"
import { getImageUrlFromBuffer } from "../lib/mp3"
import { SongInput } from "../components/SongInput"

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
    <div className='flex items-center bg-white p-8 rounded-xl shadow-lg'>
      <img className='w-60 h-60 rounded-xl' src={image != null ? image : placeHolder} onClick={uploadImage}/>
      <div className='h-60 ml-8 flex flex-col justify-evenly'>
        <SongInput
          label={"Title"}
          defaultValue={title}
          updateDisplayedSong={updateDisplayedSong}
        />
        <SongInput
          label={"Artist"}
          defaultValue={artist}
          updateDisplayedSong={updateDisplayedSong}
        />
        <SongInput
          label={"Album"}
          defaultValue={album}
          updateDisplayedSong={updateDisplayedSong}
        />
      </div>
      <input type='file' accept='image/png, image/jpeg' ref={imageInput} onChange={handleImageChange} hidden></input>
    </div>
  )
}

