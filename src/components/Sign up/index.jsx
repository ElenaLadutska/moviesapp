import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import addNewUser from "../signInLogic";

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [userFirstname, setFirstUsername] = useState('');
  const [userLastname, setLastUsername] = useState('');
  const [userPhone, setUserphone] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [repUserPassword, setRepUserPassword] = useState('');

  const [isRegistered, setRegistered]= useState(false);
  const [isAlreadyRegistered, setAlreadyRegistered]= useState(false);

  let isFormField = userPassword && repUserPassword 
    && (userPassword === repUserPassword) 
    && username && userFirstname 
    && userLastname && userPhone;
    
  let isPasswordsNotSame = userPassword && repUserPassword 
    && !(userPassword === repUserPassword);

  let navigate = useNavigate();

  const navigateToTheLink = (path) => {
    navigate(`/${path}`);
  };

  const clearValues = () => {
    setUsername('');
    setFirstUsername('');
    setLastUsername('');
    setUserphone('');
    setUserPassword('');
    setRepUserPassword('');
  }

  return (
    <div className="authorization-box">
      <div className="authorization-overlay">
        <div className="authorization">
          {!isRegistered && !isAlreadyRegistered &&
            <form className="creating-account">
              <input type="text"
                id="username"
                placeholder="Адрес электронной почты"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                />

              <input type="text" 
                id="first-name" 
                placeholder="Имя" 
                onChange={(e) => setFirstUsername(e.target.value)}
                value={userFirstname}
              />

              <input type="text" 
                id="last-name" 
                placeholder="Фамилия" 
                onChange={(e) => setLastUsername(e.target.value)}
                value={userLastname}
              />

              <input type="tel" 
                id="phone" 
                placeholder="Телефон" 
                onChange={(e) => setUserphone(e.target.value)}
                value={userPhone}
              />

              <input type="password" 
                id="password" 
                placeholder="Пароль"
                onChange={e => setUserPassword(e.target.value)}
                value={userPassword}
              />
                
              <input type="password" 
                id="rep-password" 
                placeholder="Повторите пароль" 
                onChange={(e) => setRepUserPassword(e.target.value)}
                value={repUserPassword}
              />

              { isPasswordsNotSame &&
                <div className="wrong-passwords"> 
                  Passwords aren't same
                </div>
              }

              {(!isAlreadyRegistered && !isRegistered) && isFormField 
              &&
                <Button 
                  disabled={false}
                  type="submit"
                  title="Sign up"

                  onClickFunc={() => {
                    addNewUser(username, userFirstname,userLastname,userPhone, userPassword, setAlreadyRegistered , setRegistered);
                    clearValues();
                  }}
                /> 
              }

              {(!isAlreadyRegistered && !isRegistered) && !isFormField 
                && <Button 
                    disabled={true}
                    title="Sign up"
                  />
              }
          </form>
          }

          {isAlreadyRegistered && 
            <div className="alreadyRegistered">
              <p>
                You've already been registered
              </p>
            </div>
          }

          {isRegistered && !isAlreadyRegistered &&
            <div className="registered">
              <p>
                You've successfully signed up, now you can sign in to the app
              </p>
            </div>
          }

          {(isAlreadyRegistered || isRegistered) &&
            <Button 
              title="GO TO SIGN IN"
              onClickFunc={() => navigateToTheLink("authorization")}
            />
          }
        </div>
      </div>
    </div>
  )
}

export default SignUp;
