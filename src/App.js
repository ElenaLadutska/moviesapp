import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useState } from "react";
import './styles/App.css';
import Movies from './Movies';
import Movie from './components/Movie';
import Layout from './components/Layout';
import NotFound from './components/NotFound';
import SignIn from './components/Sign in';
import SignUp from './components/Sign up';
import Profile from './components/Profile';

const App = () => {
  const [city, setCity] = useState("1");

  const [isAuthorized, setAuthorisation ] = useState(false);

  const [isModalOpen, setOpenModal] = useState(false);

  const [isNotificationOpen, setOpenNotification] = useState(false);

  return (
  <>
    <Routes>
      <Route path='/' element={
        <Layout 
          city = {city} 
          setCity = {setCity}
          isAuthorized = {isAuthorized}
          setAuthorisation = {setAuthorisation}
          isModalOpen = {isModalOpen}
          setOpenModal = {setOpenModal} 
        />}>

        <Route index 
          element={
          <Movies city={city} />} 
        />

        <Route path='movie-description/:id' 
          element={
            <Movie 
              city = {city} 
              isNotificationOpen = {isNotificationOpen} 
              isAuthorized = {isAuthorized} 
              setOpenNotification = {setOpenNotification}
              />} 
        />

        <Route path='authorization' 
          element={
            <SignIn  
              setAuthorisation = {setAuthorisation}
              setOpenModal = {setOpenModal} 
            />} 
        />

        <Route path='authorization/creating' 
          element={<SignUp />} />

        <Route path='profile' 
          element={
            <Profile />} />

        <Route path='*' 
          element={<NotFound />}/>
      </Route>
    </Routes>

    {isModalOpen && 
      <SignIn 
        setAuthorisation = {setAuthorisation}
        setOpenModal = {setOpenModal} 
      />
    }
  </>
)};

export default App;
