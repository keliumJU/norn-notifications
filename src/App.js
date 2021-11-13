import './App.css';
import NavBar from './components/NavBar'
import Routing from './router/Routing'
import Footer from './components/Footer'
import { BrowserRouter as Router } from 'react-router-dom';
import React,{useState} from 'react';
import { onMessageListener } from "./firebaseInit";
import Notifications from "./components/notifications/Notifications";
import ReactNotificationComponent from "./components/notifications/ReactNotification";

function App() {
  //config show notifications
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });

  console.log(show, notification);

  onMessageListener()
    .then((payload) => {
      setShow(true);
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
      console.log(payload);
    })
    .catch((err) => console.log("failed: ", err));




  return (
    <Router>
      <div className="App">
        {show ? (
        <ReactNotificationComponent
          title={notification.title}
          body={notification.body}
        />
        ) : (
          <></>
        )}
      <Notifications />
        <NavBar />
        <Routing />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
