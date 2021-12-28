import React, { Component } from 'react';
import '../.././App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Row, Col, Container } from 'react-bootstrap';
import { authFetch } from "./../../auth"

import necesidadGraduado from '../../need_graduate.jpg';
import BASE_URL from '../../helpers/api_base'

import SelectSearch, { fuzzySearch } from "react-select-search";
import Switch from "react-switch";

import jwt from 'jwt-decode'

class NeedGraduate extends Component {
	state = {
		data: [],
		modalInsertar: false,
		modalEliminar: false,
		modalShow: false,
		form: {
			id: '',
			tipoModal: ''
		},
		page: {
			user_id: 0,
			search: null,
			page_number: 0
		},
		LIMIT_PER_PAGE: 10,
		laboral_categories_value: '',
		laboral_categories_value_filter: '',
		laboral_categories: [],
		laboral_categories_options: [],
		dictionary_categories: {},
		checked: false,
		checkedFilter: true,
	}

	peticionGet = () => {
		const token = JSON.parse(localStorage.getItem("REACT_TOKEN_AUTH_KEY"))
		const user = jwt(token.access_token)
		this.setState({
			page: {
				...this.state.page,
				user_id: user.id
			}
		})

		authFetch(`${BASE_URL}api/need_graduate/page`, {
			method: 'POST',
			body: JSON.stringify(this.state.page),
		}).then(response => {
			//console.log("this is reponse, first aproach")
			if (response.status === 401) {
				//console.log("Sorry you aren't authorized!")
				return null
			}
			if (response.status === 403) {
				//console.log("Sorry you aren't authorized how admin!")
				return null
			}
			return response.json()
		}).then(response => {
			if (response) {
				this.setState({ data: response });
			}
		})
	}
	peticioncategoriaslaboralesget = () => {
		authFetch(`${BASE_URL}api/laboral_category/all`, {
			method: 'GET',
		}).then(response => {
			//console.log("this is reponse, first aproach")
			if (response.status === 401) {
				//console.log("Sorry you aren't authorized!")
				return null
			}
			if (response.status === 403) {
				//console.log("Sorry you aren't authorized how admin!")
				return null
			}
			return response.json()
		}).then(response => {
			if (response) {
				let data_object = []
				let option = {}
				let obj = {}
				for (let i = 0; i < response.length; i++) {
					option = { name: response[i].name, value: response[i].id }
					var val = response[i].id

					obj[val] = response[i].name

					data_object.push(option)
				}
				this.setState({ laboral_categories_options: data_object });
				this.setState({ dictionary_categories: obj })
			}
		})
	}
	peticionPost = async () => {
		const token = JSON.parse(localStorage.getItem("REACT_TOKEN_AUTH_KEY"))
		const user = jwt(token.access_token)

		let status = 0
		if (this.state.checked) {
			status = 1
		}

		const data = new FormData()
		data.append('laboral_category_id', this.state.laboral_categories_value)
		data.append('user_id', user.id)
		data.append('status', status)
		console.warn(data);

		authFetch(`${BASE_URL}api/need_graduate/create`, {
			method: 'POST',
			body: data,
		}).then(response => {
			//console.log("this is reponse, first aproach")
			if (response.status === 401) {
				//console.log("Sorry you aren't authorized!")
				return null
			}
			if (response.status === 403) {
				//console.log("Sorry you aren't authorized how admin!")
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
		const token = JSON.parse(localStorage.getItem("REACT_TOKEN_AUTH_KEY"))
		const user = jwt(token.access_token)

		let status = 0
		if (this.state.checked) {
			status = 1
		}

		const data = new FormData()

		data.append('laboral_category_id', this.state.laboral_categories_value)
		data.append('user_id', user.id)
		data.append('status', status)

		authFetch(`${BASE_URL}api/need_graduate/${this.state.form.id}/edit`, {
			method: 'PUT',
			body: data,
		}).then(response => {
			//console.log("this is reponse, first aproach")
			if (response.status === 401) {
				//console.log("Sorry you aren't authorized!")
				return null
			}
			if (response.status === 403) {
				//console.log("Sorry you aren't authorized how admin!")
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

		authFetch(`${BASE_URL}/api/need_graduate/${this.state.form.id}`, {
			method: 'DELETE',
		}).then(response => {
			//console.log("this is reponse, first aproach")
			if (response.status === 401) {
				//console.log("Sorry you aren't authorized!")
				return null
			}
			if (response.status === 403) {
				//console.log("Sorry you aren't authorized how admin!")
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

	modalInsertar = () => {
		this.setState({ modalInsertar: !this.state.modalInsertar });
		//console.log("this is modalInsertar ...")
		//console.log(this.state.modalInsertar)
		if (this.state.modalInsertar) {
			this.setState({ checked: false })
			this.setState({ laboral_categories_value: '' })
		}
	}

	seleccionarNeedGraduate = (need_graduate) => {
		this.setState({
			tipoModal: 'actualizar',
			form: {
				id: need_graduate.id,
			}
		})
		this.setState({ checked: need_graduate.status })
		this.setState({ laboral_categories_value: need_graduate.laboral_category_id })
	}

	handleChange = async e => {
		e.persist();
		await this.setState({
			form: {
				...this.state.form,
				[e.target.name]: e.target.value
			}
		});
	}

	handleChecked = nextChecked => {
		this.setState({
			checked: nextChecked
		})
	}

	handleCheckedFilter = async val => {
		//hacer la peticion con los parametros de filtrado
		this.setState({
			checkedFilter: val 
		})
		let status=0
		if(val){
			status=1
		}
		await this.setState({
			page: {
				...this.state.page,
				search: {
					...this.state.page.search,
					status: status 
				}
			}
		})
		this.handlePageUser()
	}

	handleSelectSearch = async val => {
		this.setState({
			laboral_categories_value: val
		})
	}

	handleSelectSearchFilter = async val => {
		//hacer la peticion con los parametros de filtrado
		await this.setState({
			page: {
				...this.state.page,
				search: {
					status:1,
					laboral_category_id: val
				}
			}
		})
		this.setState({
			laboral_categories_value_filter: val
		})
		this.handleCheckedFilter(true)
		this.handlePageUser()
	}
	handleResetFilter = async e => {
		//hacer la peticion con los parametros de filtrado
		e.persist()
		await this.setState({
			page: {
				user_id: 0,
				search: null,
				page_number: 0
			}
		});

		await this.setState({checkedFilter:true})
		this.setState({laboral_categories_value_filter:''})

		this.handlePageUser()
	}

	//Determinate where the button have active ... in base to count of register in the response
	handlePageBefore = async e => {
		e.persist();
		var inic = this.state.page.page_number - 1
		await this.setState({
			page: {
				...this.state.page,
				page_number: inic
			}
		})
		this.peticionGet()
	}

	handlePageUser = async () => {
		const token = JSON.parse(localStorage.getItem("REACT_TOKEN_AUTH_KEY"))
		const user = jwt(token.access_token)
		await this.setState({
			page: {
				...this.state.page,
				user_id: user.id
			}
		})
		this.peticionGet()
	}

	handlePageAfter = async e => {
		e.persist();
		var inic = this.state.page.page_number + 1
		await this.setState({
			page: {
				...this.state.page,
				page_number: inic
			}
		})
		this.peticionGet()
	}

	componentDidMount() {
		this.handlePageUser();
		this.peticioncategoriaslaboralesget();
	}

	render() {
		const { form } = this.state;
		return (
			<div className="App">
				<br /><br /><br />
				<button className="btn btn-success" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar() }}>Agregar Necesidad del Egresado</button>
				<br /><br />
				<Container >
					<Row>
						<Col>
							<SelectSearch
								options={this.state.laboral_categories_options}
								value={this.state.laboral_categories_value_filter}
								onChange={this.handleSelectSearchFilter}
								search
								filterOptions={fuzzySearch}
								placeholder="Search something"
							/>

						</Col>
						<Col>
							<Switch
								checked={this.state.checkedFilter}
								onChange={this.handleCheckedFilter}
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
							<button className="btn btn-primary" onClick={this.handleResetFilter}>reset</button>
						</Col>
					</Row>
					<Row >
						<Col>
							<table className="table">
								<thead>
									<tr>
										<th scope="col">Id</th>
										<th scope="col">Categoria Laboral</th>
										<th scope="col">Estado</th>
										<th scope="col">Opciones</th>
										<th scope="col"></th>
									</tr>
								</thead>
								<tbody>
									{this.state.data.map(need_graduate => {

										return (
											<tr key={need_graduate.id}>
												<th scope="row">{need_graduate.id}</th>
												<td>{this.state.dictionary_categories[need_graduate.laboral_category_id]}</td>
												<td>
													<Switch
														onChange={this.handleChecked}
														checked={need_graduate.status}
														className="react-switch"
													/>
												</td>
												<td>
													{"   "}
													<button className="btn btn-warning" onClick={() => { this.seleccionarNeedGraduate(need_graduate); this.setState({ modalShow: true }) }}><FontAwesomeIcon icon={faEye} /></button>
													{"   "}
													<button className="btn btn-primary" onClick={() => { this.seleccionarNeedGraduate(need_graduate); this.modalInsertar() }}><FontAwesomeIcon icon={faEdit} /></button>
													{"   "}
													<button className="btn btn-danger" onClick={() => { this.seleccionarNeedGraduate(need_graduate); this.setState({ modalEliminar: true }) }}><FontAwesomeIcon icon={faTrashAlt} /></button>
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
								this.state.page.page_number === 0 ? true : false
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
								<label htmlFor="laboral_category_id">Categorias Laborales</label>
								<SelectSearch
									options={this.state.laboral_categories_options}
									value={this.state.laboral_categories_value}
									onChange={this.handleSelectSearch}
									search
									filterOptions={fuzzySearch}
									placeholder="Search something"
								/>
								<br />
								<label>
									<span>Status</span>
									<Switch
										onChange={this.handleChecked}
										checked={this.state.checked}
										className="react-switch"
									/>
								</label>
								<br />
							</div>
						</form>
					</ModalBody>

					<ModalFooter>
						{this.state.tipoModal === 'insertar' ?
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
						Estás seguro que deseas eliminar la necesidad <strong>{this.state.dictionary_categories[this.state.laboral_categories_value]}</strong>
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
								<div className="text-center"> <img src={necesidadGraduado} width="100" class="rounded-circle" alt="img about need graduate"/>
									<h3 className="mt-2">{this.state.dictionary_categories[this.state.laboral_categories_value]}</h3> <span className="mt-1 clearfix">Tipo de categoria</span>
									<div className="row mt-3 mb-3">
										<div className="col-md-12">
											<h5><strong>{this.state.checked ? 'Activo' : 'Inactivo'}</strong></h5> <span className="num">Estado</span>
										</div>
									</div>
									<div className="profile mt-5"> <button className="profile_button px-5" onClick={() => this.setState({ modalShow: false })}>OK</button> </div>
								</div>
							</div>
						</div>
					</ModalBody>

				</Modal>
			</div>
		);
	}
}
export default NeedGraduate;