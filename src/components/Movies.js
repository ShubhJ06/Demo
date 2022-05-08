import React, { useState, useEffect } from 'react'
import Pagination from './Pagination'
import axios from 'axios'
import { Oval } from 'react-loader-spinner';
function Movies() {
    let [movies, setMovies] = useState([]);
    let [pageNumber, setPage] = useState(1);
    let [hover, setHover] = useState('');
    let [favourites, setFavourites] = useState([]);
    function goAhead() {
        setPage(pageNumber + 1);
    }
    function goBehind() {
        if (pageNumber > 1) {
            setPage(pageNumber - 1);
        }
    }
    function addToFavourites(movie) {
        let newArray = [...favourites, movie];
        setFavourites([...newArray]);
        localStorage.setItem("imdbData",JSON.stringify(newArray));
    }
    function removeFromFavourites(movie) {
        let newArray = [...favourites];
        let idx = newArray.findIndex(m => m.id === movie.id);
        newArray.splice(idx, 1);
        setFavourites([...newArray]);
        localStorage.setItem("imdbData",JSON.stringify(newArray));
    }
    useEffect(function () {
        let oldFav = localStorage.getItem("imdbData");
        oldFav = JSON.parse(oldFav)||[];
        setFavourites([...oldFav]);

        axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=c404755ab0be45ee5ec6bc51f2ed1a32&page=${pageNumber}`).then((res) => {
            setMovies(res.data.results);            
        })
    }, [pageNumber])
    return (
        <>
            <div className='mb-8'>
                <div className="mt-4 md:mt-8 mb-2 md:mb-6 text-2xl md:text-3xl font-bold text-center">Trending Movies</div>
                <div className='flex flex-wrap justify-center'>
                    {
                        movies.length == 0 ? <Oval height="50" width="50" color="black" secondaryColor='grey'></Oval> :
                            movies.map(m => {
                                let url = "https://image.tmdb.org/t/p/w500" + m.backdrop_path;
                                return (
                                    <div key={m.id} className={`bg-[url(${url})] h-[25vh] w-[250px] m-2 md:h-[35vh] md:w-[350px] md:m-4 bg-center bg-cover flex items-end rounded-xl  hover:scale-105 ease-out duration-500 relative`} onMouseEnter={() => {
                                        setHover(m.id);
                                    }} onMouseLeave={() => {
                                        setHover("");
                                    }}>
                                        {
                                            hover == m.id && <>{
                                                !favourites.find(movie => m.id == movie.id) ?
                                                    <div className="absolute top-3 right-6 text-red-600 py-2 px-3 bg-gray-100 bg-opacity-70 rounded-lg cursor-pointer" onClick={() => addToFavourites(m)} >
                                                        <i className="far fa-heart"></i>
                                                    </div> :
                                                    <div className="absolute top-3 right-6 text-red-600 py-2 px-3 bg-gray-100 bg-opacity-70 rounded-lg cursor-pointer" onClick={() => removeFromFavourites(m)}>
                                                        <i className="fas fa-heart" ></i>
                                                    </div>
                                            }
                                            </>
                                        }
                                        <div className='py-1 px-1 font-semibold md:text-lg md: px-2 md:py-2 w-full bg-gray-300 bg-opacity-50 text-center rounded-b-xl'>{m.title}</div>
                                    </div>
                                )
                            })
                    }
                </div>
            </div>
            <Pagination goAhead={goAhead} goBehind={goBehind} pageNumber={pageNumber}></Pagination>
        </>
    )
}

export default Movies