function User (mail, name, surname, phone, password) {
  this.isAuth = false;
  this.mail = mail;
  this.name = name;
  this.surname = surname;
  this.phone = phone;
  this.password = password;
};

const addNewUser = ( mail, name, surname, phone, password, setAlreadyRegistered, setRegistered ) => {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const newUser = new User(mail, name, surname, phone, password);

  if (!users.length) {
    users.push(newUser);
    setRegistered(true);
  } else {
    users.map((user) => {
      if (user.mail === mail) {
        setAlreadyRegistered(true);
      } else if (users.every(user =>  user.mail !== mail)){
          users.push(newUser);
          setRegistered(true);
        };
      
      return user;
    });
  }

  return localStorage.setItem('users', JSON.stringify(users));
};

export default addNewUser;
