import Button from "../Button";

const Profile = () => {
  const authoriedUser = JSON.parse(localStorage.getItem("authoriedUser")) || {};
  console.log(authoriedUser);
  const {name, surname} = authoriedUser;

  return (
    <div className="user-data">
      <input type="text" placeholder={name} disabled/>
      <input type="text" placeholder={surname} disabled/>

      <label htmlFor="users-birthday">Дата рождения</label>
      <input type="date" name="users-birthday" />

      <label htmlFor="users-city">Город</label>
      <input type="text" name="users-city"/>

      <select name="gender" defaultValue={"default"}>
        <option value={"default"} disabled>Пол</option>
        <option value="male">Мужской</option>
        <option value="female">Женский</option>
      </select>

      <Button 
        title = "Сохранить"
      />
    </div>
  )
}

export default Profile;
