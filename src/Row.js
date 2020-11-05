import React, {useState,useEffect} from 'react';
import axios from './axios';
import './Row.css';
import YouTube from "react-youtube";
import movieTrailer from 'movie-trailer';

const base_url = 'https://image.tmdb.org/t/p/original/'
function Row({title,fetchUrl,isLarageRow}) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("")
    // A snippet of code which runs on specific condition
    useEffect(()=>{

    // if [], run once when the row load and don't run again
    async function fetchData(){
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);
        return request;
        
    } 
    fetchData();
    },[fetchUrl]);

    const opts = {
        height:"390",
        width:"100%",
        playerVars:{
            autoplay:1,
        },
    };

    const handleClick = (movie) =>{
        if(trailerUrl){
          setTrailerUrl('')  
        }else{
            movieTrailer(movie?.title || "" )
            // movieTrailer(movie['original_title'] || "")
            .then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search);
                // console.log(url);
                setTrailerUrl(urlParams.get('v'));
                

            })
            .catch((error)=>console.log(error))
        }
        // console.log()
    }
    console.log(movies);
    return (
        <div className="row">
        <h2>{title}</h2>
        <div className="row_posters">
            {/* Here we will have several row_posters */}

           {movies.map(movie =>(
              <img
                key={movie.id}
                onClick={()=>handleClick(movie)}
                className={`row_poster ${isLarageRow && "row_posterLarge"}`}
                src={`${base_url}${isLarageRow ? movie.poster_path : movie.backdrop_path}`}
                alt={movie.name}
               >

              </img> 
           ))

           } 

        </div>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} /> }
        </div>
    )
}

export default Row
