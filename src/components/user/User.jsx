import React, { Component } from 'react';
import '../.././App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Row, Col, Container } from 'react-bootstrap';
import API from '../../api/api'
import Role from '../../helpers/role'
import { authFetch } from "./../../auth"

import noimg from '../../noimg.jpg';
import { Link } from 'react-router-dom';

class User extends Component {
	state = {
		data: [],
		modalInsertar: false,
		modalEliminar: false,
		modalShow: false,
		form: {
			id: '',
			username: '',
			password: '',
			email: '',
			name: '',
			img: '',
			role: '',
			is_active: '',
			tipoModal: ''
		},
		page: {
			search: null,
			ini: 0,
			end: 10
		},
		file: null,
		LIMIT_PER_PAGE: 10,
	}
	handleInputChange = async event => {
		await this.setState({
			file: event.target.files[0],
		});
	}


	peticionGet = () => {
		authFetch("/api/users/page", {
			method: 'POST',
			body: JSON.stringify(this.state.page),
		}).then(response => {
			console.log("this is reponse, first aproach")
			if (response.status === 401) {
				console.log("Sorry you aren't authorized!")
				return null
			}
			if (response.status === 403) {
				console.log("Sorry you aren't authorized how admin!")
				return null
			}
			return response.json()
		}).then(response => {
			if (response) {
				this.setState({ data: response });
			}
		})
	}

	peticionPost = async () => {
		const data = new FormData()
		data.append('img', this.state.file)
		data.append('username', this.state.form.username)
		data.append('password', this.state.form.password)
		data.append('email', this.state.form.email)
		data.append('name', this.state.form.name)
		data.append('role', this.state.form.role)
		data.append('is_active', 0)

		console.warn(data);

		authFetch("/api/users/create", {
			method: 'POST',
			body: data,
		}).then(response => {
			console.log("this is reponse, first aproach")
			if (response.status === 401) {
				console.log("Sorry you aren't authorized!")
				return null
			}
			if (response.status === 403) {
				console.log("Sorry you aren't authorized how admin!")
				return null
			}
			return response.json()
		}).then(response => {
			if (response) {
				this.modalInsertar();
				this.peticionGet();
			}
		})
	}

	peticionPut = () => {
		const data = new FormData()

		data.append('img', this.state.file)
		data.append('username', this.state.form.username)
		data.append('password', this.state.form.password)
		data.append('email', this.state.form.email)
		data.append('name', this.state.form.name)
		data.append('role', this.state.form.role)

		authFetch(`/api/users/${this.state.form.id}/edit`, {
			method: 'PUT',
			body: data,
		}).then(response => {
			console.log("this is reponse, first aproach")
			if (response.status === 401) {
				console.log("Sorry you aren't authorized!")
				return null
			}
			if (response.status === 403) {
				console.log("Sorry you aren't authorized how admin!")
				return null
			}
			return response.json()
		}).then(response => {
			if (response) {
				this.modalInsertar();
				this.peticionGet();
			}
		})
	}

	peticionDelete = () => {

	authFetch(`/api/users/${this.state.form.id}`, {
			method: 'DELETE',
		}).then(response => {
			console.log("this is reponse, first aproach")
			if (response.status === 401) {
				console.log("Sorry you aren't authorized!")
				return null
			}
			if (response.status === 403) {
				console.log("Sorry you aren't authorized how admin!")
				return null
			}
			return response.json()
		}).then(response => {
			if (response) {
				this.setState({ modalEliminar: false });
				this.peticionGet();
			}
		})	
	}
	handleActiveUser = (id) => {

		authFetch(`/api/users/${id}/active`, {
				method: 'GET',
			}).then(response => {
				console.log("this is reponse, first aproach")
				if (response.status === 401) {
					console.log("Sorry you aren't authorized!")
					return null
				}
				if (response.status === 403) {
					console.log("Sorry you aren't authorized how admin!")
					return null
				}
				return response.json()
			}).then(response => {
				if (response) {
					this.peticionGet();
				}
			})	
	}

	modalInsertar = () => {
		this.setState({ modalInsertar: !this.state.modalInsertar });
	}

	seleccionaruser = (user) => {
		console.log("This is update: ----")
		console.log(user.role)
		console.log(user.name)
		this.setState({
			tipoModal: 'actualizar',
			form: {
				id: user.id,
				username: user.username,
				password: user.password,
				email: user.email,
				name: user.name,
				role: user.roles,
				img: user.img
			}
		})
	}

	handleChange = async e => {
		e.persist();
		await this.setState({
			form: {
				...this.state.form,
				[e.target.name]: e.target.value
			}
		});
		console.log(this.state.form);
	}


	handleSearch = async e => {
		e.preventDefault();
		const form = e.target;
		const searching = form.search.value;
		console.log(searching)
		const searchPage = {
			search: {
				username: searching,
				email: searching,
				name: searching
			},
			ini: 0,
			end: 10
		}

		this.setState({
			page: searchPage
		})
		await authFetch("/api/users/page", {
			method: 'POST',
			body: JSON.stringify(searchPage),
		}).then(response => {
			console.log("this is reponse, first aproach")
			if (response.status === 401) {
				console.log("Sorry you aren't authorized!")
				return null
			}
			if (response.status === 403) {
				console.log("Sorry you aren't authorized how admin!")
				return null
			}
			return response.json()
		}).then(response => {
			if (response) {
				this.setState({ data: response });
				console.log(this.state.data.length)
			}
		})

	}

	resetPassword = () => {
		this.setState({
			form: {
				...this.state.form,
				password: ''
			}
		});
	}


	//Determinate where the button have active ... in base to count of register in the response
	handlePageBefore = async e => {
		e.persist();
		var inic = this.state.page.ini - 10
		await this.setState({
			page: {
				...this.state.page,
				ini: inic,
				end: 10
			}
		})
		this.peticionGet()
	}

	handlePageAfter = async e => {
		e.persist();
		var inic = this.state.page.ini + 10
		await this.setState({
			page: {
				...this.state.page,
				ini: inic,
				end: 10,
			}
		})
		this.peticionGet()
	}

	componentDidMount() {
		this.peticionGet();
	}


	render() {
		const { form } = this.state;
		return (
			<div className="App">
				<br /><br /><br />
				<button className="btn btn-success" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar() }}>Agregar user</button>
				<br /><br />
				<Container >
					<Row>
						<form onSubmit={this.handleSearch}>
							<input className="form-control" type="text" placeholder="...search" name="search" />
							<button type="submit" className="btn btn-primary active m-1" >search</button>
							<button type="reset" className="btn btn-secondary active">Limpiar</button>
						</form>
					</Row>
					<Row >
						<Col>
							<table className="table">
								<thead>
									<tr>
										<th scope="col">id</th>
										<th scope="col">Username</th>
										<th scope="col">Email</th>
										<th scope="col">Name</th>
										<th scope="col">Roles</th>
										<th scope="col">Active</th>
										<th scope="col">Options</th>
									</tr>
								</thead>
								<tbody>
									{this.state.data.map(user => {

										return (
											<tr>
												<th scope="row">{user.id}</th>
												<td>{user.username}</td>
												<td>{user.email}</td>
												<td>{user.name}</td>
												<td>{user.roles}</td>
												<td>
													{
														console.log("user active:" + user.is_active)
													}
													<button className={user.is_active===true ? "btn btn-success" : "btn btn-danger"}
														onClick={()=>{this.handleActiveUser(user.id)}}	
													>
														active
													</button>
												</td>
												<td>
													{"   "}
													<button className="btn btn-warning" onClick={() => { this.seleccionaruser(user); this.setState({ modalShow: true }) }}><FontAwesomeIcon icon={faEye} /></button>
													{"   "}
													<button className="btn btn-primary" onClick={() => { this.seleccionaruser(user); this.modalInsertar() }}><FontAwesomeIcon icon={faEdit} /></button>
													{"   "}
													<button className="btn btn-danger" onClick={() => { this.seleccionaruser(user); this.setState({ modalEliminar: true }) }}><FontAwesomeIcon icon={faTrashAlt} /></button>
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
								this.state.page.ini === 0 ? true : false
							}
								onClick={this.handlePageBefore} >Anterior</button>

							<button className="btn btn-outline-info" disabled={
								this.state.data.length < this.state.LIMIT_PER_PAGE ? true : false
							}
								onClick={this.handlePageAfter} >Siguiente</button>
						</Col>
						<br />
						<br />
						<br />
						<br />
						<br />
					</Row>
				</Container>

				<Modal isOpen={this.state.modalInsertar}>
					<ModalHeader style={{ display: 'block' }}>
						<span style={{ float: 'right' }} onClick={() => this.modalInsertar()}>x</span>
					</ModalHeader>
					<ModalBody>
						<form action="#">
							<div className="form-group">
								<label htmlFor="id">ID</label>
								<input className="form-control" type="text" name="id" id="id" readOnly onChange={this.handleChange} value={form ? form.id : this.state.data.length + 1} />
								<br />
								<label htmlFor="username">Username</label>
								<input className="form-control" type="text" name="username" id="username" onChange={this.handleChange} value={form ? form.username : ''} required />
								<br />
								<label htmlFor="password">Password</label>
								<input className="form-control" type="password" name="password" id="password" onChange={this.handleChange} value={form ? form.password : ''} required />
								{this.state.tipoModal == 'insertar' ? null : <button className="btn btn-primary" onClick={this.resetPassword}>clear</button>}
								<br />
								<label htmlFor="email">Email</label>
								<input className="form-control" type="email" name="email" id="email" onChange={this.handleChange} value={form ? form.email : ''} required />
								<br />
								<label htmlFor="name">name</label>
								<input className="form-control" type="text" name="name" id="name" onChange={this.handleChange} value={form ? form.name : ''} />
								<br />
								<label htmlFor="role">role</label>
								<select className="form-control" name="role" id="role" value={form ? form.role : ''} onChange={this.handleChange} >
									<option value="">Selected a Role</option>
									{
										Object.keys(Role).map(function (key, index) {
											return (
												<option value={Role[key]}>{Role[key]}</option>
											)
										})
									}
								</select>
								<br />
								<label htmlFor="img">Img</label>
								<br />
								{this.state.tipoModal == 'insertar' ?
									<input className="form-control" type="file" name="img" id="img" onChange={this.handleInputChange} /> :
									<div>
										<input className="form-control" type="file" name="img" id="img" onChange={this.handleInputChange} />
										<img src={form.img ? form.img : noimg} className="rounded-circle" width="300" alt="img" />
									</div>
								}
							</div>
						</form>
					</ModalBody>

					<ModalFooter>
						{this.state.tipoModal == 'insertar' ?
							<button className="btn btn-success" onClick={() => this.peticionPost()}>
								Insertar
							</button> : <button className="btn btn-primary" onClick={() => this.peticionPut()}>
								Actualizar
							</button>
						}
						<button className="btn btn-danger" onClick={() => this.modalInsertar()}>Cancelar</button>
					</ModalFooter>
				</Modal>

				<Modal isOpen={this.state.modalEliminar}>
					<ModalBody>
						Estás seguro que deseas eliminar al usuario <strong>{form && form.email}</strong>
					</ModalBody>
					<ModalFooter>
						<button className="btn btn-danger" onClick={() => this.peticionDelete()}>Sí</button>
						<button className="btn btn-secundary" onClick={() => this.setState({ modalEliminar: false })}>No</button>
					</ModalFooter>
				</Modal>

				<Modal isOpen={this.state.modalShow}>
					<ModalBody className="modal-show">
						<div className="container d-flex justify-content-center">
							<div className="card p-3 py-4">
								<div className="text-center"> <img src={form&&form.img?form.img:noimg} width="100" class="rounded-circle" />
									<h3 className="mt-2">{form&&form.name}</h3> <span className="mt-1 clearfix">{form&&form.email}</span>
									<div className="row mt-3 mb-3">
										<div className="col-md-6">
											<h5>{form&&form.username}</h5> <span className="num">username</span>
										</div>
										<div className="col-md-6">
											<h5>{form&&form.role}</h5> <span className="num">role</span>
										</div>
										
									</div>
									<div className="profile mt-5"> <button className="profile_button px-5" onClick={()=>this.setState({modalShow:false})}>OK</button> </div>
								</div>
							</div>
						</div>
					</ModalBody>
				
				</Modal>



			</div>
		);
	}
}
export default User;