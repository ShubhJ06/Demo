import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Oval } from 'react-loader-spinner';
function Banner() {
    let [movie, setMovie] = useState([]);
    useEffect(function () {
        axios.get("https://api.themoviedb.org/3/trending/all/week?api_key=c404755ab0be45ee5ec6bc51f2ed1a32").then((res) => setMovie(res.data.results[0]))
    }, [])
    return (
        movie.length == 0 ?
            <div className='flex  justify-center align-center border h-[35vh] md:h-[60vh] items-center'>
                <Oval height="100" width="100" color="black" secondaryColor='grey'></Oval>
            </div> :
            <div className={`bg-[url(https://image.tmdb.org/t/p/original${movie.backdrop_path})] h-[35vh] md:h-[60vh] bg-center bg-cover flex items-end border-t`}>
                <div className='text-white  text-2xl md:text-4xl p-2 md:p-4 bg-gray-900 bg-opacity-50 w-full flex justify-center'>{movie.title}</div>
            </div>
    )
}

export default Banner