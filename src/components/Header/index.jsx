import { useNavigate } from "react-router-dom";
import Cities from "../Cities";
import Button from "../Button";
import { useState, useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Header = ({ city, setCity, isAuthorized, setAuthorisation, setOpenModal }) => {
  const [authoriedUser, setUser] = useState("");

  const showModal = () => setOpenModal(true);

  const hideModal = () => {
    setOpenModal(false);
    setAuthorisation(false);
    localStorage.removeItem("authoriedUser");
  };

  let navigate = useNavigate();

  const navigateToTheLink = (path) => navigate(`/${path}`);

  const getAuthUser = () => {
    const authoriedUser = JSON.parse(localStorage.getItem("authoriedUser")) || null;

    authoriedUser ? setUser(authoriedUser.name) : setUser("")
  };

  useEffect(() => getAuthUser, [isAuthorized]);

  return (
    <header>
      <div 
        className="logo"
        onClick={() => {
          setOpenModal(false);
          navigateToTheLink("");
        }}>

        <h3>the</h3>
        <h1>MOVIES</h1>
      </div>
      
      <Cities 
        city={city} 
        setCity={setCity}/>

      {isAuthorized && authoriedUser &&
        <div 
          className="users-profile"
          onClick={() => navigateToTheLink("profile")}
        >
          {<AccountCircleIcon />}
          <h6>
            АККАУНТ
          </h6>
        </div>
      }

      <Button 
        title={isAuthorized ? "Выйти": "Войти"} 
        className={isAuthorized ? "sign-out-btn": "sign-in-btn"} 
        onClickFunc={isAuthorized ? hideModal : showModal}
      />
    </header>
  )
}

export default Header;
