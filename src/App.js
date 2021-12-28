import './App.css';
import NavBar from './components/NavBar'
import Routing from './router/Routing'
import Footer from './components/Footer'
import { BrowserRouter as Router } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { onMessageListener } from "./firebaseInit";
import Notifications from "./components/notifications/Notifications";
import ReactNotificationComponent from "./components/notifications/ReactNotification";
import localforage from "localforage";

import { Switch, Route, useLocation } from "react-router-dom";
import Test1 from "./Test1";
import Test2 from "./Test2";
function App() {
  const location = useLocation();
  //config show notifications
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [countNewNoti, setCountNewNoti] = useState(0);
  const [refreshDropdown, setRefreshDropdown] = useState(false);


  useEffect(() => {
    console.log(location)
    let path = location.pathname
    path=path.toString()
    if (path.localeCompare("/")==0){
        setShow(true)
        setNotification({
          title: path,
          body: "To my app",
        });
    }else{
      console.log("nothing")
    }
    //setShow(false) -> infinite loop
    //localStorage.setItem('logout_on',false)
    //if that is backgruond because i have to show the notification???
    localforage.getItem("newNoti").then(val => {
      if (val === true) {

        localStorage.setItem('newNoti', true)
        console.log("here transform")
      }
      let value = localStorage.getItem("newNoti")
      if (value === 'true') {
        console.log("is true in localForage")
        //setShow(true)
        //setRefreshDropdown(true)
      }
    });
  }, [location]);

  onMessageListener()
    .then((payload) => {
      //update the dropdown bell with lime color
      setCountNewNoti(val=>(val+1));
      localStorage.setItem('newNoti', true)
      setShow(true)
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
      console.log(payload);
    })
    .catch((err) => console.log("failed: ", err));

  /*
navigator.serviceWorker.addEventListener('message', function (event) {
  console.log('event listener', event);

  if (event.data === 'new_notification') {
    setShow(true)
    if (event.data.notification.body !== "Sayonara") {
      console.log("here in this iff. ...")
      localStorage.setItem('newNoti', true);
      if(refreshDropdown){
        setRefreshDropdown(1)
      }else{
        setRefreshDropdown(true)
      }
    }
    //localStorage.setItem('newNoti', true);
  }
});
*/


  return (
    <div className="App d-flex flex-column min-vh-100">
      {show ? (
        <ReactNotificationComponent
          title={notification.title}
          body={notification.body}
        />
      ) : (
        <></>
      )}
      <Notifications />
      <NavBar newNoti={countNewNoti} />
      <Routing />
      <Footer />
      <Switch>
        <Route exact path="/test1" component={Test1} />
        <Route path="/test2" component={Test2} />
      </Switch>
    </div>

  );
}

export default App;
