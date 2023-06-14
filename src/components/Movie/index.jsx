import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from 'react';
import Alert from '@mui/material/Alert';
import DateObject from "react-date-object";
import player from "./img/bigPlayer.png";
import Cinemas from "../Cinemas";

const Movie = ({ city, isNotificationOpen, isAuthorized, setOpenNotification }) => {
  console.log(window.location.href);
  const { id } = useParams();

  const [movie, setMovies] = useState([]); 

  let [isError, setIsError] = useState(false);

  const getMovie = useCallback(() => {
    try {
      fetch(`https://soft.silverscreen.by:8443/wssite/webapi/event/data?filter=%7B%22event%22:%22${id}%22,%22city%22:%22${city}%22%7D&extended=true`)
      .then(response => response.json())
      .then(data => setMovies(data));
    } catch (error) {
      setIsError(true);
      alert('Something wrong')
    }
  }, [id, city]);

  useEffect(() => {
    getMovie()}, 
    [id, city, getMovie]
  );

  const startTime = (place) =>  new DateObject(place).format("MMMM DD, YYYY");

  return(
    <>
      {isNotificationOpen && !isAuthorized &&
        <div className='notification'>
          <Alert 
            severity="warning"
            onClick={() => setOpenNotification(false)}
          >
            Log in to buy a ticket, please!
          </Alert>
        </div>
      
      }

      {!!movie?.length &&
          movie.map(
            ({
              name, posterLink, bannerLink,genres, runTime, annotation, rentalDateStart, ageLimit, trailerLink, showList
            }, index) => {
            return (
              <div className="movie"
               key={index}
               >
                <div className="img-container">
                  <img 
                  alt="poster"
                    src={posterLink}>
                  </img>
                </div>

                <div 
                  className="movie-info"
                >
                  <div className="movie-title">
                    <h1>{name}</h1>

                    {
                      <div className="genres">
                        {
                          Array.from(genres).map((genre, index) => (
                            <span key={index}>{genre.name}</span>
                          )
                        )}
                      </div>
                    }
                  </div>

                  <div className="additional-info">
                      <a 
                        className="play-btn"
                        href={trailerLink}
                        target="_blank"
                        rel="noreferrer">
                        <img src={player} alt="player" />
                      </a>

                    <div className="release-date">
                      <span>ДАТА ВЫХОДА</span>
                      <p>{startTime(Date.parse(rentalDateStart))}</p>
                    </div>

                    <div className="run-time">
                      <span>ДЛИТЕЛЬНОСТЬ</span>
                      <p>{runTime} min </p>
                    </div>

                    <div className="age-limit">
                      <span>ВОЗРАСТ</span>
                      <p>{ageLimit.acronym}</p>
                    </div>
                  </div>

                  <div className="description">
                    <h2>ОПИСАНИЕ</h2>
                    <p>
                      {annotation}
                    </p>
                  </div>
                </div>

                <div className="cinemas">
                  {<Cinemas 
                    list={showList} 
                    city={city} 
                    isAuthorized = {isAuthorized}
                    setOpenNotification ={setOpenNotification}
                  />}
                </div>
              </div>
          )
          })
        }

        {
          isError && (
            <div className="error">Oops, something went wrong</div>
          )
        }
    </>
  )
}

export default Movie;
