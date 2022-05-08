import React, { useState, useEffect } from 'react'
import Pagination from './Pagination'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


function Favourites() {
  let genreids = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Sci-Fi',
    10770: 'TV',
    53: 'Thriller',
    10752: 'War',
    37: 'Western'
  }
  let [favourites, setFavourites] = useState([]);
  let [allGenres, setAllGenres] = useState([]);
  let [curGenre, setCurGenre] = useState("All");
  let [searchText, setSearchText] = useState("");
  let [numOfRows, setNumOfRows] = useState(4);
  let [rating, setRating] = useState(0);
  let [popularity, setPopularity] = useState(0);
  let [curPage, setCurPage] = useState(1);
  let [isListening, setIsListening] = useState(false);
  let { transcript, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    let oldFav = localStorage.getItem("imdbData");
    oldFav = JSON.parse(oldFav) || [];
    setFavourites([...oldFav])
  }, [])

  useEffect(() => {
    let arr = favourites.map((movie) => genreids[movie.genre_ids[0]]);
    setAllGenres(["All", ...new Set(arr)]);
    // console.log(allGenres);
  }, [favourites])

  function startListening() {
    setSearchText("");
    setIsListening(true);
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
    // console.log(transcript);
  }
  function stopListening() {
    setSearchText(transcript);
    setIsListening(false);
    SpeechRecognition.stopListening();
    // console.log(transcript);
  }

  function removeFromFavourites(movie) {
    let newArray = [...favourites];
    let idx = newArray.findIndex(m => m.id === movie.id);
    newArray.splice(idx, 1);
    setFavourites([...newArray]);
    localStorage.setItem("imdbData", JSON.stringify(newArray));
  }
  let filteredMovies = [];
  filteredMovies = curGenre == "All" ? favourites : favourites.filter(movie => genreids[movie.genre_ids[0]] === curGenre);

  if (rating == 1) {
    filteredMovies = filteredMovies.sort((obj1, obj2) => {
      return obj1.vote_average - obj2.vote_average;
    })
  } else if (rating == -1) {
    filteredMovies = filteredMovies.sort((obj1, obj2) => {
      return obj2.vote_average - obj1.vote_average;
    })
  } else if (popularity == 1) {
    filteredMovies = filteredMovies.sort((obj1, obj2) => {
      return obj1.popularity - obj2.popularity;
    })
  } else if (popularity == -1) {
    filteredMovies = filteredMovies.sort((obj1, obj2) => {
      return obj2.popularity - obj1.popularity;
    })
  }

  filteredMovies = filteredMovies.filter(movie => movie.title.toLowerCase().includes(searchText.toLowerCase()));

  let maxPage = Math.ceil(filteredMovies.length / numOfRows);
  let si = (curPage - 1) * numOfRows
  let ei = Number(si) + Number(numOfRows)

  filteredMovies = filteredMovies.slice(si, ei);

  let goBehind = () => {
    if (curPage > 1) {
      setCurPage(curPage - 1)
    }
    // console.log(curPage);
  }

  let goAhead = () => {
    if (curPage < maxPage) {
      setCurPage(curPage + 1)
    }
  }

  return (
    <>

      <div className='flex justify-center flex-wrap space-x-5 md:space-x-8 px-2 m-2'>
        {
          allGenres.map((genre,idx) => {
            return (<button key={idx} className={curGenre == genre ? 'text-white bg-blue-400 rounded-lg px-2 py-1 mt-3 mb-3' : 'text-white bg-gray-400 hover:bg-blue-400 rounded-lg px-2 py-1 mt-3 mb-3'} onClick={() => {
              setCurGenre(genre);
              setCurPage(1);
            }}>{genre}</button>)
          })
        }
      </div>
      <div className="flex flex-wrap justify-center space-x-4 md:space-x-7  items-center">
        <div className="relative ">
          <input className=" w-[45vw] md:w-auto border border-blue-400 focus:border-2 outline-none p-1 md:p-1" placeholder="Search Movies" type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
          <div className="flex justify-center items-center -translate-y-1/2 -translate-x-1/2 inset-y-1/2 -right-3 h-[100%] w-[15%] absolute" onClick={isListening == false ? startListening : stopListening} >{isListening == false ? <i className="fas fa-microphone text-blue-400"></i> : <i className="fas fa-microphone-slash text-red-400"></i>}</div>
        </div>

        <div className="">
          <input className="w-[45vw] md:w-auto border border-blue-400 p-1 md:p-1 focus:border-2 outline-none" placeholder="No. of Rows" type="number" value={numOfRows} onChange={(e) => {
            if (parseInt(e.target.value) > 0)
              setNumOfRows(parseInt(e.target.value))
          }} />
        </div>

        {
          filteredMovies.length > 1 ?
            <div className=''>
              <button className=" mt-2 md:mt-0 md:w-auto border border-red-600 p-1 md:p-1 text-red-600 hover:bg-red-600 hover:text-white ease-out duration-1000" onClick={() => {
                setFavourites([]);
                localStorage.setItem("imdbData", JSON.stringify([]));
              }}>Remove All</button>
            </div>
            :
            <></>
        }
      </div>
      <div className="flex flex-col m-4">
        <div className="-my-1 overflow-x-auto sm:-mx-6 lg:-mx-4">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 min-w-full">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>

                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className='flex'>
                        <img src='https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-up-arrows-those-icons-lineal-those-icons-3.png' className='mr-2 cursor-pointer' onClick={() => { setRating(-1); setPopularity(0); }} />
                        Rating
                        <img src='https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-down-arrows-those-icons-lineal-those-icons-4.png' className='ml-2 mr-2 cursor-pointer' onClick={() => { setRating(1); setPopularity(0); }} />
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className='flex'>
                        <img className='mr-2 cursor-pointer' src='https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-up-arrows-those-icons-lineal-those-icons-3.png' onClick={() => { setRating(0); setPopularity(-1); }} />
                        Popularity
                        <img className='ml-2 mr-2 cursor-pointer' src='https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-down-arrows-those-icons-lineal-those-icons-4.png' onClick={() => { setRating(0); setPopularity(1); }} />
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Genre</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remove</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {
                    filteredMovies.map(m => {
                      return (
                        <tr key={m.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 md:h-[100px] md:w-[180px]">
                                <img className="hidden md:block md:h-[100px] md:w-[180px]" src={`https://image.tmdb.org/t/p/w500/${m.backdrop_path}`} alt="" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900 font-bold">{m.title}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center whitespace-nowrap">
                            <div className="text-sm text-gray-900">{m.vote_average}</div>
                          </td>
                          <td className="px-6 py-4  text-center whitespace-nowrap">
                            <div className="text-sm text-gray-900">{m.popularity}</div>
                          </td>
                          <td className="px-6 py-4  whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">{genreids[m.genre_ids[0]]}</span>
                          </td>
                          <td className="px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-center">
                            <button href="#" className="text-red-600 hover:text-red-900" onClick={() => removeFromFavourites(m)}>Delete</button>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-4'>
        {filteredMovies.length > 0 ? <Pagination pageNumber={curPage} goAhead={goAhead} goBehind={goBehind}></Pagination> : <></>}
      </div>
    </>
  )
}

export default Favourites