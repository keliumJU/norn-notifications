import React, { useState, useEffect } from 'react';
import '../static/css/QuantityInput.css'
import { NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { faBell, faBriefcase} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import localforage from "localforage";

import BASE_URL from '../helpers/api_base'
import NAME_DOMAIN from '../helpers/name_domain'

import jwt from 'jwt-decode'

import noimg from '../noimg.jpg';


const NotificationsDropdown = ({ getNewNoti }) => {

	const [data, setData] = useState([]);
	const [boolGetNewNoti, setBoolNewNoti] = useState(false)
	const [readNoti, setReadNoti] = useState(false)
	const [userId, setUserId] = useState(0);
	const styleDropdown = {
		display: "inline-block",
	}

	useEffect(() => {

		const token = JSON.parse(localStorage.getItem("REACT_TOKEN_AUTH_KEY"))
		const storageNewNoti = localStorage.getItem("newNoti")
		if (storageNewNoti) {
			if (storageNewNoti === 'false') {
				setBoolNewNoti(false)
			} else if (storageNewNoti === 'true') {
				console.log("here not")
				setBoolNewNoti(true)
			}
		}

		if (token) {

			const user = jwt(token.access_token)

			const url = `${BASE_URL}api/notifications/?userId=${user.id}&pageNumber=0`

			setUserId(user.id)

			const fetchData = async () => {
				try {
					const response = await fetch(url, {
						method: 'POST',
						body: JSON.stringify({})
					});
					const json = await response.json();
					setData(json);
					if (getNewNoti) {
						setBoolNewNoti(true);
						localStorage.setItem('newNoti', true);
						console.log("is here in line 56")
						console.log(getNewNoti)
					}
				} catch (error) {
					//console.log("error", error);
				}
			};
			fetchData();
		}
	}, [getNewNoti, readNoti]);

	const handleBellNoti = () => {
		localStorage.setItem('newNoti', false);
		localforage.setItem('newNoti', false).then(function (value) {
			// Do other things once the value has been saved.
			console.log(value);
		}).catch(function (err) {
			// This code runs if there were any errors
			console.log(err);
		});
		setBoolNewNoti(false);
	}

	//Select url to find the entity where an actor realized any action
	const redirectToView = async noti => {
		//object notification
		if (noti.entity_type_id === 3) {
			const url = `${NAME_DOMAIN}job_offer_view/${noti.entity_id}`
			const win = window.open(url, "_blank");
			win.focus();
		} else if (noti.entity_type_id === 4) {
			const url = `${NAME_DOMAIN}need_graduate_view/${noti.entity_id}`
			const win = window.open(url, "_blank");
			win.focus();
		} else if (noti.entity_type_id === 1) {
			const url = `${NAME_DOMAIN}user_account_view/${noti.entity_id}`
			const win = window.open(url, "_blank");
			win.focus();
		}
	}

	const markRead = id => {
		setStatusNotification(userId, id)
	}

	const setStatusNotification = async (notifier_id, object_notification_id) => {

		let url = `${BASE_URL}api/notifications/revised`

		const data = new FormData()
		data.append('notifier_id', notifier_id)
		data.append('notification_object_id', object_notification_id)

		try {
			const response = await fetch(url, {
				method: 'POST',
				body: data
			});
			const json = await response.json();
			if (json[1] === 200) {
				readNoti === false ? setReadNoti(true) : setReadNoti(false)
			}
		} catch (error) {
			//console.log("error", error);
		}
	};

	return (
		<>
			<NavDropdown onClick={handleBellNoti} title={<div style={styleDropdown}> <FontAwesomeIcon icon={faBell} size="2x" color={boolGetNewNoti ? 'lime' : ''} /></div>} id="collasible-nav-dropdown">
				<Link className="dropdown-item" to='/notification_list'>
					<div className="notifications-header">
						<header>
							<h6>Notifications</h6>
						</header>
						<strong>View All</strong>
					</div>
				</Link>
				<NavDropdown.Divider />

				{data.map(function (item, i) {
					return (<NavDropdown.Item onClick={() => { redirectToView(item); markRead(item.id) }} key={i}>
						<div className="notifications-item" style={item.status ? { backgroundColor: "#ABEA7C" } : { backgroundColor: "#FAD02C" }}> <img src={item.img_user ? item.img_user : noimg} alt="img" />
							<div className="text">
								<h4>{item.created_on}</h4>
								<p>{item.message.substring(0, 51)}</p>
							</div>
							<div>{item.message.length > 51 ? <span className="three-points">...</span> : <></>}</div>
						</div>
					</NavDropdown.Item>);
				})}
			</NavDropdown>
		</>
	)
};

NotificationsDropdown.defaultProps = {
	getNewNoti: false
};



export default NotificationsDropdown;