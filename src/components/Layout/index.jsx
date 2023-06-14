import Header from "../Header";
import { Outlet } from "react-router-dom";

const Layout = ({ city, setCity, isAuthorized, setAuthorisation,setOpenModal, authoriedUser, setUser }) => {
  return (
    <>
      <Header 
        city={city}
        setCity={setCity}
        isAuthorized = {isAuthorized}
        setAuthorisation = {setAuthorisation}
        setOpenModal = {setOpenModal}
        authoriedUser = {authoriedUser}
        setUser = {setUser}
      />

      <Outlet />
    </>
  )
}

export default Layout;
