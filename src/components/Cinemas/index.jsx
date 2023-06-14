import DateObject from "react-date-object";

const Cinemas = ({ list, isAuthorized, setOpenNotification}) => {
  const showDate = (date) => {
    return new DateObject(date).format("DD-MM-YYYY"); 
  };

  const startTime = (place) => {
    return new DateObject(place).format("HH:mm");
  };

  return (
    <>
      {!!list
        ? Object.entries(list).map(([date, value], index) => (
          <div 
            key={index}
            className="show-date"
          >
            <h2>{showDate(Date.parse(date))}</h2>

            <div className="places">
              {value.map((place, index) => {
                return (
                  <div 
                    className="place-and-time"
                    key={index}
                    onClick={isAuthorized 
                      ? () => alert('Okay, buy')
                      : () => setOpenNotification(true)
                    }
                    >
                      
                      <div className="place">{place.theater.name}</div>

                      <div className="time">
                        {startTime(Date.parse(place.start))}
                      </div>
                  </div>
                )})}
            </div>

          </div>
          ))
        : <div className="no-cinemas">
            No cinemas to show yet
          </div>
      }
    </>
  )
}

export default Cinemas;
