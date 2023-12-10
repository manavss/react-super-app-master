import { useState, useEffect } from 'react';
import './Movies.css'
import { MOVIES_API_KEY } from '../../api';

const Card = ({genreId}) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    
  
    useEffect(() => {
      handleMovies()
    }, [genreId])
  
    const handleMovies = () => {
      setLoading(true);
      fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${MOVIES_API_KEY}&with_genres=${genreId}`)
        .then(res => res.json())
        .then(data => setMovies(data.results))
        .then(() => setLoading(false))
        .catch(err => console.log(err))
    }
  return (
    <>
     {movies && movies.slice(0, 4).map(movie => (
    <div key={movie.id} className="movie">
    <img src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt={movie.title} width={240} height={130} className='movie-img' />
  </div>
    ))}
  </>
  )
}

export default Card