import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Alert from '@mui/material/Alert';
import Button from "../Button";

const SignIn = ({setAuthorisation, setOpenModal}) => {
  const [username, setUsername] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isCanBeLogged, setLogged] = useState(true);

  let navigate = useNavigate();

  const toPage = (path) => {
    navigate(`/${path}`);
  };

  const checkingData = (name, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const authoriedUser = [];

    const currentUser = users.find(user => user.mail.trim() === name.trim());

    if (currentUser && currentUser.password === password && !authoriedUser.includes(currentUser)) {
      currentUser.isAuth = true;

      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('authoriedUser', JSON.stringify(currentUser));

      setAuthorisation(true);
      setOpenModal(false);
      toPage('');
    } else if (authoriedUser.includes(currentUser)) {
      setAuthorisation(true);
      setOpenModal(false);
      toPage('');
    } else setLogged(false);
  };

  return (
    <div className="sign-in">
      <div className="sign-in-content">
        <div className="sign-in-header">
          <span>Вход в личный кабинет</span>

          <div className="cross">
            <Button 
              title="X" 
              onClickFunc={() => setOpenModal(false)}
              />
          </div>
        </div>

        {!isCanBeLogged && 
          <Alert 
            severity="error" 
            style={{margin: "0 0 1em 0"}}
          >
            Incorrect username or password!
          </Alert>
          
        }

        <form className="users-data">
          <input type="email"
            id="username" 
            placeholder="Логин"
            onChange={(e) => setUsername(e.target.value)}
            />

          <input type="password" 
            id="password" 
            placeholder="Пароль"
            onChange={(e) => setUserPassword(e.target.value)}
            />
        </form>

        <div className="reset">
          <Button 
            title="Забыли пароль?"
            onClickFunc={() => alert(`Скоро добавим эту функцию`)}
          />
        </div>

        <Button 
          title='Вход'
          className={'log-in-btn'}
          onClickFunc={() => checkingData(username, userPassword)}
        />

        <div className="create-acc-btn">
          <span>Нет аккаунта?</span>

          <Button 
            title="Зарегистрироваться"
            onClickFunc={() => {
              setOpenModal(false);
              toPage("authorization/creating");
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default SignIn;
