import React, { useState, useEffect } from 'react';

import BASE_URL from '../../helpers/api_base'

import jwt from 'jwt-decode'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEye, faBookReader} from '@fortawesome/free-solid-svg-icons';
import { Row, Col, Container, Button, Modal } from 'react-bootstrap';

import Role from "../../helpers/role"
import SelectSearch, { fuzzySearch } from "react-select-search";
import Switch from "react-switch";


function NotificationList() {

	const [data, setData] = useState([]);
	const [pageNumber, setPageNumber] = useState(0)
	const [userId, setUserId] = useState(0)


	//get detail of notifications in modal windows 
	const [showActive, setShowActive] = useState(false)
	const [showDelete, setShowDelete] = useState(false)
	const [notiDetail, setNotiDetail] = useState({})


	//filters states
	const [dateFilter, setDateFilter] = useState('')
	const [entityTypeId, setEntityTypeId] = useState('')
	const [checkedFilter, setCheckedFilter] = useState(false)
	/*
		filter items:
		"filter_dict":{
			"entity_type_id":2,
			"created_on":"2021-11-29",
			"status":0
		}
	*/
	const [filterDict, setFilterDict] = useState({})

	const handleShow = () => setShowDelete(true);

	const [typeEntityOptions, setTypeEntityOptions] = useState([])

	const dictionary_type_entity_filter = { 2: "usuario activo", 5: "usuario inactivo", 3: "oferta laboral", 4: "necesidad egresado", 1: "nuevo usuario" }

	const LIMIT_PER_PAGE = 10

	const fetchNotificationsUser = async (user_id, pageNumber) => {

		let	url = `${BASE_URL}api/notifications/?userId=${user_id}&pageNumber=${pageNumber}`

		try {
			const response = await fetch(url,{
				method:'POST',
				body:JSON.stringify({filter_dict:filterDict})
			});
			const json = await response.json();
			setData(json)
		} catch (error) {
			//console.log("error", error);
		}
	};

	const setStatusNotification= async (notifier_id, object_notification_id) => {

		let url = `${BASE_URL}api/notifications/revised`

		const data = new FormData()
		data.append('notifier_id', notifier_id)
		data.append('notification_object_id', object_notification_id)

		try {
			const response = await fetch(url,{
				method:'POST',
				body:data
			});
			const json = await response.json();
			if(json[1]===200){
				fetchNotificationsUser(userId, pageNumber)
			}
		} catch (error) {
			//console.log("error", error);
		}
	};

	const deleteNotification= async (notifier_id, object_notification_id) => {

		let url = `${BASE_URL}api/notifications/delete`

		const data = new FormData()
		data.append('notifier_id', notifier_id)
		data.append('notification_object_id', object_notification_id)

		try {
			const response = await fetch(url,{
				method:'DELETE',
				body:data
			});
			const json = await response.json();
			if(json[1]===200){
				fetchNotificationsUser(userId, entityTypeId, pageNumber)
			}
		} catch (error) {
			//console.log("error", error);
		}
	};

	useEffect(() => {
		let user_id = getUserId()
		if (user_id) {
			setUserId(user_id)
			setFilterDict({})
		}
	}, []);

	useEffect(() => {
		fetchNotificationsUser(userId, pageNumber);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filterDict]);

	const getUserId = () => {
		const token = JSON.parse(localStorage.getItem("REACT_TOKEN_AUTH_KEY"))
		var user_id = null
		if (token) {
			const user = jwt(token.access_token)
			user_id = user.id
			//get role of user
			if (user.rls === Role.Company) {
				setTypeEntityOptions([
					{ "name": "usuario activo", "value": 2 },
					{ "name": "usuario inactivo", "value": 5 },
					{ "name": "necesidad egresado", "value": 4 },
				])
			} else if (user.rls === Role.Graduate) {
				setTypeEntityOptions([
					{ "name": "usuario activo", "value": 2 },
					{ "name": "usuario inactivo", "value": 5 },
					{ "name": "oferta laboral", "value": 3 },
				])
			} else if (user.rls === Role.Admin) {
				setTypeEntityOptions([
					{ "name": "nuevo usuario", "value": 1 },
				])
			}

		}
		return user_id;
	}

	/*Paging management*/

	const handlePageBefore = async e => {
		e.persist();
		var inic = pageNumber - 1
		await setPageNumber(inic)
		fetchNotificationsUser(userId, inic)
	}

	const handlePageAfter = async e => {
		e.persist();
		var inic = pageNumber + 1
		await setPageNumber(inic)
		fetchNotificationsUser(userId, inic)
	}

	const handleSelectTypeEntityFilter = async val => {

		await setEntityTypeId(val)
		await setFilterDict(prevState => ({
			...prevState,
			'entity_type_id': val 
		}));
		//fetchNotificationsUser(userId, pageNumber)
	}


	/* status of notification */
	const markRead = id => {
		setStatusNotification(userId, id)
	}

	const handleDelete= () => {
		deleteNotification(userId, notiDetail.id);
		setShowDelete(false);
	}
	const handleClose = () => {
		setShowDelete(false);
	}

	/* date filter */
	const handleDate = async e => {
		e.persist()
		await setDateFilter(e.target.value)
		await setFilterDict(prevState => ({
			...prevState,
			'created_on': e.target.value 
		}));
	}

	/* status filter */

	const handleCheckedFilter = async val => {
		await setCheckedFilter(val)

		let status=0
		if(val){
			status=1
		}
		await setFilterDict(prevState => ({
			...prevState,
			'status': status 
		}));
	}

	//Reboot filter options

	const handleResetFilter = async e =>{
		e.persist()
		await setFilterDict({})
		await setDateFilter('')
		await setEntityTypeId('')
	}

	//Select url to find the entity where an actor realized any action
	const redirectToView = async noti => {
		//object notification
		if(noti.entity_type_id===3){
			const url = `/job_offer_view/${noti.entity_id}`
			const win = window.open(url, "_blank");
			win.focus();
		}else if(noti.entity_type_id===4){
			const url = `/need_graduate_view/${noti.entity_id}`
			const win = window.open(url, "_blank");
			win.focus();
		}else if(noti.entity_type_id===2 || noti.entity_type_id===5){
			setShowActive(true)
		}else if(noti.entity_type_id===1){
			const url = `/user_account_view/${noti.entity_id}`
			const win = window.open(url, "_blank");
			win.focus();
		}
	}
	const handleCloseActive = () => {
		setShowActive(false);
	}

	const selectNotification = async noti => {
		await setNotiDetail(noti)
	}

	return (
		<>
		<div className="row m-3">
			<h1>Notifications List</h1>
		</div>
			<Container >
				<Row className="m-5">
					<Col>
						<SelectSearch
							options={typeEntityOptions}
							value={entityTypeId}
							onChange={handleSelectTypeEntityFilter}
							search
							filterOptions={fuzzySearch}
							placeholder="Filtro tipo de entidad"
						/>
					</Col>
					<Col>
						<input type="date" className="sm-form-control" value={dateFilter} onChange={handleDate}/>	
					</Col>
					
					<Col>
							<Switch
								checked={checkedFilter}
								onChange={handleCheckedFilter}
								onColor="#86d3ff"
								onHandleColor="#2693e6"
								handleDiameter={30}
								uncheckedIcon={false}
								checkedIcon={false}
								boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
								activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
								height={20}
								width={48}
								className="react-switch"
								id="material-switch"
							/>
						</Col>

					<Col>
						<button className="btn btn-info" onClick={handleResetFilter}>Reset</button>
					</Col>

				</Row>
				<Row >
					<Col>
						<table className="table">
							<thead>
								<tr>
									<th scope="col">ID</th>
									<th scope="col">TYPE ENTITY</th>
									<th scope="col" className="table-warning">MESSAGE</th>
									<th scope="col">CREATED ON</th>
									<th scope="col">OPTIONS</th>
								</tr>
							</thead>
							<tbody>
								{data.map(noti => {

									return (
										<tr key={noti.id}>
											<th scope="row">{noti.id}</th>
											<td>{dictionary_type_entity_filter[noti.entity_type_id]}</td>
											<td className="border-td" style={noti.status?{backgroundColor: "#ABEA7C"}:{backgroundColor:"#FAD02C"} } > {noti.message} </td>
											<td>{noti.created_on}</td>
											<td>
												{"   "}

												<button className="btn btn-warning" onClick={() => {redirectToView(noti); selectNotification(noti);}}><FontAwesomeIcon icon={faEye} /></button>
												{"   "}
												<button className="btn btn-info" onClick={() => { markRead(noti.id);}}><FontAwesomeIcon icon={faBookReader} /></button>
												{"   "}
												<button className="btn btn-danger" onClick={() => { selectNotification(noti); handleShow()}}><FontAwesomeIcon icon={faTrashAlt} /></button>
											</td>
										</tr>
									)
								})
								}
							</tbody>
						</table>
					</Col>
				</Row>
				<Row>
					<Col>
						<button className="btn btn-outline-info" disabled={
							pageNumber === 0 ? true : false
						}
							onClick={handlePageBefore} >Anterior</button>

						<button className="btn btn-outline-info" disabled={
							data.length < LIMIT_PER_PAGE ? true : false
						}
							onClick={handlePageAfter} >Siguiente</button>
					</Col>
					<br />
					<br />
					<br />
					<br />
					<br />
				</Row>
			</Container>

			<Modal show={showDelete} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Eliminar Notificacion</Modal.Title>
				</Modal.Header>
				<Modal.Body>Esta seguro que desea eliminar esta notificacion</Modal.Body>
				<Modal.Footer>
					<Button variant="danger" onClick={handleDelete}>
						OK	
					</Button>
				</Modal.Footer>
			</Modal>

			<Modal show={showActive} onHide={handleCloseActive}>
				<Modal.Header closeButton>
					<Modal.Title>Esta es una simple accion del administrador</Modal.Title>
				</Modal.Header>
				<Modal.Body>{notiDetail.message}</Modal.Body>
				<Modal.Footer>
					<Button variant="info" onClick={handleCloseActive}>
						OK	
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}
export default NotificationList