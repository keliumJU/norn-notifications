import React, { useState, useEffect } from 'react';
import '../App.css'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import BASE_URL from '../helpers/api_base'
import jwt from 'jwt-decode'

import noimg from '../noimg.jpg';

import logo from '../logo.svg';
import logoNorn from '../logo_norn.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/*Dropdown notifications*/

import NotificationsDropdown from './NotificationsDropdown';

import ReactNotificationComponent from "./notifications/ReactNotification";

import { login, useAuth, logout } from "./../auth"

import { useHistory } from "react-router-dom";

// Importing toastify module
import { toast } from 'react-toastify';
// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';
import { faBraille, faBriefcase, faBuilding, faBusinessTime, faBox, faUsers, faSignInAlt, faUserCircle, faUser, faChessPawn } from '@fortawesome/free-solid-svg-icons';

toast.configure()

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
		toast.info('We hope you come back soon... Sayonara :)')
		history.push('/login')
	}

	return (
		<>

			<Navbar bg="dark" variant="dark">
				<Container>
					<Link className="navbar-brand" to='/'>
						<img
							alt=""
							src={logoNorn}
							width="40"
							height="40"
							className="d-inline-block align-top"
						/>{' '}
						Norn Notifications
					</Link>
					<Nav className="mx-auto">

						{
							logged ?
								<>

									{
										role === 'admin' ?
											<>
												<Link className="nav-link" to='/user'>
													<FontAwesomeIcon icon={faUsers} size="2x" />
													Users
												</Link>
												<Link className="nav-link" to='/laboral_categories'>
													<FontAwesomeIcon icon={faBox} size="2x" />
													Laboral Categories
												</Link>
											</>
											:
											<></>
									}
									{
										role === 'graduate' ?
											<Link className="nav-link" to='/need_graduate'>
												<FontAwesomeIcon icon={faBusinessTime} size="2x" />
												Need Graduate
											</Link>
											:
											<></>
									}
									{
										role === 'company' ?
											<Link className="nav-link" to='/job_offer'>
												<FontAwesomeIcon icon={faBuilding} size="2x" />
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
										<FontAwesomeIcon icon={faSignInAlt} size="2x" />
										Login
									</Link>
									<Link className="nav-link" to='/register'>
										<FontAwesomeIcon icon={faUserCircle} size="2x" />
										Register
									</Link>
									<Link className="nav-link" to='/about'>
										<FontAwesomeIcon icon={faChessPawn} size="2x" />
										About	
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