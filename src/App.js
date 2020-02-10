import React, { useEffect, useState } from 'react';
import './App.css';
import './style.css';
import Homepage from './pages/Homepage';
import Searchbar from './components/Navbar'
import axios from 'axios'
import { Route, } from "react-router-dom"
import UserProfilePage from './pages/UserProfile'
import MyProfile from './pages/MyProfile'
import UploadPage from './pages/UploadPage'
import { ToastContainer, toast } from 'react-toastify';




function App() {
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem('jwt') !== null
  );


  useEffect(() => {
    // performing a GET request
    axios.get('https://insta.nextacademy.com/api/v1/users')
      .then(result => {
        // If successful, we do stuffs with 'result'
        ; // putting the results in a state (user)
        console.log(result.data)
        setUsers(result.data)


      })
      .catch(error => {
        // If unsuccessful, we notify users what went wrong
        console.log('ERROR: ', error)
      })

  }, [])




  // Login and Staying login by storing auth key in JWT
  const loginUser = (username, password, callback) => {
    axios({
      method: "POST",
      url: "https://insta.nextacademy.com/api/v1/login",
      data: {
        username: username,
        password: password
      }
    })
      .then(response => {
        if (response.status === 201) {
          toast.success(
            `Welcome back ${response.data.user.username}`,

          );
          localStorage.setItem('jwt', response.data.auth_token);
          localStorage.setItem("userInfo", JSON.stringify(response.data.user));
          setCurrentUser(response.data.user);
          callback();
        }
      })
      .catch(response => {
        if (response.status === 401) {
          toast.error(
            "Invalid credentials, check and try again."
          );
        }
      });
  };

  const logoutUser = () => {
    toast.success("Successfully logged out");
    localStorage.removeItem('jwt');
    localStorage.removeItem("userInfo");
    setCurrentUser(null);
  };






  return (
    <>
      <ToastContainer />
      <Searchbar
        loginUser={loginUser}
        logoutUser={logoutUser}
        currentUser={currentUser}

      />

      <Route exact path="/" ><Homepage users={users} /> {/* sending users as props to Homepage  */} {/* the homepage path is defined as "/" */}</Route>


      <Route path="/users/:id"> <UserProfilePage users={users} /> {/* sending users as props to UserProfilepage  */} {/* the userpage path is defined as "/users/:id" */}</Route>

      <Route exact path="/profile"><MyProfile />

      </Route>

      <Route exact path="/uploadimage"><UploadPage /></Route>

    </>
  )
}



export default App;
