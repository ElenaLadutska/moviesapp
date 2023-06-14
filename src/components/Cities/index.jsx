import { CITIES } from "../../constants";

const Cities = (props) => {
  const { city, setCity } = props;

  return (
    <>
      <select 
        name="cities"
        id="cities"
        value={city}
        onChange={event => {
          setCity(event.target.value);
        }}
      >
        {
          CITIES.map((city, index) => (
            <option 
              key={index}
              value={city.value}>
                {city.label}
            </option>
          ))
        }
      </select>
    </>
  )
}

export default Cities;
