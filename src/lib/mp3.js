export const getImageUrlFromBuffer = arrayBufferView => {
    const blob = new Blob([arrayBufferView], {type: "image/jpeg"})
    const urlCreator = window.URL || window.webkitURL;
    const imageUrl = urlCreator.createObjectURL(blob);
    return imageUrl; 
}

export const createSongFromTag = tag => {
    const song = {
        title: tag.title.replace('\0', ''),
        artist: tag.artist.replace('\0', ''),
        album: tag.artist.replace('\0', ''),
        image: {
            url: getImageUrlFromBuffer(tag.image.data),
            data: tag.image.data 
        }
    }
    return song;
}
