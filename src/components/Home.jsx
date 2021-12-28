import React, { useState, useEffect, useLocation } from 'react';
import '../App.css'

// msg boostrap config
import { Button, Row, Toast } from 'react-bootstrap'
import { login, useAuth, logout } from "./../auth"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useHistory } from "react-router-dom";


import { Link, Redirect } from 'react-router-dom';

import { withRouter } from 'react-router-dom';

import ReactNotificationComponent from "./notifications/ReactNotification";

const Home = props => {
	const [show, setShow] = useState(false);
	const [logged] = useAuth();
	let history = useHistory();
	/*
	useEffect(() => {
		if (logged) {
			setShow(true)
		} else {
			setShow(false)
		}
	});
	*/

	const showMessage = async () =>{
		//await setShow(true)
		await toast.info('some')
		return <Redirect to='http://localhost:3000/login'/>
		//await history.push('/login')
	}

	return (
		<>
			{show ? (
				<ReactNotificationComponent
					title={"Welcome to the jungle"}
					body={"Enjoy..."}
				/>
			) : (
				<></>
			)}

			<h1>Home</h1>
			<button onClick={showMessage}>Push</button>
			<Link to='/test1'>Test1</Link>
			<Link to='/test2'>Test2</Link>
		</>
	)
}
//export default Home;
export default withRouter(Home);
