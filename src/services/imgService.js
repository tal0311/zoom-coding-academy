const imgs={
    liked:'https://misc.scdn.co/liked-songs/liked-songs-64.png'
}


function getImg(name){
    return imgs[name]
}

export const imgService = {
    getImg
}