import React, { useState, useEffect } from 'react';
import '../App.css'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import BASE_URL from '../helpers/api_base'
import jwt from 'jwt-decode'

import noimg from '../noimg.jpg';

import logo from '../logo.svg';

/*Dropdown notifications*/

import NotificationsDropdown from './NotificationsDropdown';

import ReactNotificationComponent from "./notifications/ReactNotification";

import { login, useAuth, logout } from "./../auth"

import { useHistory } from "react-router-dom";

// Importing toastify module
import { toast } from 'react-toastify';

// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';

const NavBar = ({ newNoti }) => {

	const [userName, setUserName] = useState("");
	const [userImg, setUserImg] = useState("");
	const [role, setRole] = useState("");
	const [userId, setUserId] = useState(0);
	const [logged] = useAuth();

	const [show, setShow] = useState(false);


	let history = useHistory();

	useEffect(() => {
		const token = JSON.parse(localStorage.getItem("REACT_TOKEN_AUTH_KEY"))
		if (token) {
			const user = jwt(token.access_token)
			setUserId(user.id)
			setRole(user.rls)
			const urlUserName = `${BASE_URL}api/users/${user.id}`
			const urlUserImg = `${BASE_URL}api/user_profile/${user.id}`

			const fetchUser = async () => {
				try {
					const response = await fetch(urlUserName);
					const json = await response.json();
					setUserName(json[0].user.username)
				} catch (error) {
					//console.log("error", error);
				}
			};
			const fetchUserImg = async () => {
				try {
					const response = await fetch(urlUserImg);
					const json = await response.json();
					setUserImg(json.img)
				} catch (error) {
					//console.log("error", error);
				}
			};
			fetchUser();
			fetchUserImg();
		}
	}, [logged]);

	const handleLogout = () => {
		logout()
		/*
		const data = new FormData()
		data.append('user_id', userId)

		const url = `${BASE_URL}api/users/logout`
		const userLogout = async () => {
			try {
				const response = await fetch(url,{
					method:'POST',
					body:data
				});
				const json = await response.json();
			} catch (error) {
				//console.log("error", error);
			}
		};
		userLogout();
		*/
		history.push('/login')
	}

	return (
		<>

			<Navbar bg="dark" variant="dark">
				<Container>
					<Link className="navbar-brand" to='/'>
						<img
							alt=""
							src={logo}
							width="30"
							height="30"
							className="d-inline-block align-top"
						/>{' '}
						React Bootstrap
					</Link>
					<Nav className="mx-auto">

						{
							logged ?
								<>

									{
										role === 'admin' ?
											<>
												<Link className="nav-link" to='/user'>
													User
												</Link>
												<Link className="nav-link" to='/laboral_categories'>
													Laboral Categories
												</Link>
											</>
											:
											<></>
									}
									{
										role === 'graduate' ?
											<Link className="nav-link" to='/need_graduate'>
												Need Graduate
											</Link>
											:
											<></>
									}
									{
										role === 'company' ?
											<Link className="nav-link" to='/job_offer'>
												Job Offer
											</Link>
											:
											<></>
									}

									<NotificationsDropdown getNewNoti={newNoti} />

									<NavDropdown sytle={{ overflowX: "hidden" }}
										title={
											<div style={{ display: "inline-block" }}>
												<img
													src={userImg ? userImg : noimg}
													width="40" height="40" className="rounded-circle"
													alt="user pic"
												/>
											</div>
										}
										id="collasible-nav-dropdown">
										<Link className="dropdown-item" to="/user_profile"><strong>{userName}</strong></Link>
										<NavDropdown.Divider />
										<NavDropdown.Item onClick={handleLogout}>
											<i className="fa fa-sign-out"></i> Logout
										</NavDropdown.Item>
									</NavDropdown>
								</>
								:
								<>

									<Link className="nav-link" to='/login'>
										Login
									</Link>
									<Link className="nav-link" to='/register'>
										Register
									</Link>
								</>
						}
					</Nav>

				</Container>
			</Navbar>
		</>
	)
};

NavBar.defaultProps = {
	newNoti: false
};

export default NavBar;