export const SongInput = ({ label, defaultValue, updateDisplayedSong }) => {
  return(
    <div className='w-full flex justify-evenly mb-4'>
      <label className='relative'> 
        <input
          placeholder={label}
          className="border-solid border-2 border-lightgrey h-10 pl-2 rounded outline-none transition duration-200 focus:border-green peer"
          type="text" 
          defaultValue={defaultValue}
          onChange={(e) => updateDisplayedSong(label.toLowerCase(), e.target.value)}
        />
        <span className="absolute bg-white text-sm text-green invisible left-3 bottom-8 pl-1 pr-1 mr-4 transition duration-20 ease-in peer-focus:visible peer-focus:bottom-8">
          {label}
        </span>
      </label>
    </div>
  )
}

