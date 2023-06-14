import { Link } from 'react-router-dom';
import notFound from '../../assets/404.png';

function NotFound() {
  return(
    <div className="not-found">
      <img src={notFound} alt="not-found-404" />

      <h1>
        ИЗВИНИТЕ, МЫ НЕ НАШЛИ ТАКУЮ СТРАНИЦУ
      </h1>

      <span>Все фильмы находятся на главной</span>

      <h3><Link to="/">На главную</Link></h3>

    </div>
  )
}

export default NotFound;
