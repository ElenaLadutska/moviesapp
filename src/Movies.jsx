import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import getMoviesInfo from "./getMoviesInfo";
import Button from "./components/Button";
import Loader from "./components/Loader";
import ScrollButton from "./components/ScrollButton";

const Movies = ({ city }) => {
  let [isLoading, setLoading] = useState(true);

  const [movies, setMovies] = useState([]);

  const [value, setValue] = useState("");

  let [isError, setError] = useState(false);

  const [filteredMovies, setFilteredMovies] = useState([]);


  const [scrollTop, setScrollTop] = useState(0);

  let navigate = useNavigate();

  const getMovies = useCallback(() => {
    try {
      getMoviesInfo(city, setMovies, setLoading);
    } 
    catch (error) {
      setError(true);
    }
  }, [city]);

  const filterMovies = useCallback(
    () => 
    setFilteredMovies(movies?.filter(
      movie => movie.name.toLowerCase().includes(value.toLowerCase()))),
    [movies, value],
  );

  const navigateToTheLink = (path) => {
    navigate(`/${path}`)
  }

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  useEffect(() => {
    filterMovies()
  }, [filterMovies]);


  useEffect(() => {
    const handleScroll = () => {
      setScrollTop(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {isLoading && <Loader />}

      {
        !isLoading &&
        <div className="movies-container">
          <input 
            type="text" 
            onChange={event => setValue(event.target.value)}
            value={value}
            placeholder="Поиск..."
          />

          <ul className="movies">
            {!!movies?.length &&
              filteredMovies.map((
                { name, posterLink, eventId} , index) => (
                  <li key={index}>
                    <img 
                      alt="movie"
                      src={posterLink}>
                    </img>

                    <h2>
                      {name}
                    </h2>
                  
                    <Button 
                      title="Купить билет"
                      className="buy-ticket"
                      onClickFunc={() => navigateToTheLink(`movie-description/${eventId}`)}
                    />
                  </li>
              ))
            }

            {
              !movies?.length && !isLoading && (
                <div className="no-movies">Мы не нашли фильмы!</div>
              )
            }

            {
              isError && (
                <div className="error">Упс, что-то пошло не так, попробуйте еще раз</div>
              )
            }
          </ul>


          {
            scrollTop > 200 ? <ScrollButton /> : ""
          }
      </div>
      }
    </>
    )
}

export default Movies;
