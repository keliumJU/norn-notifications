import React, { Component } from 'react';
import '../.././App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Row, Col, Container } from 'react-bootstrap';
import { authFetch } from "./../../auth"

import jobOffer from '../../job_offer.png';
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
			salary: 0,
			description: '',
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

		type_offer_options: [
			{ "name": "contrato", "value": 1 },
			{ "name": "prestaciones", "value": 2 },
			{ "name": "practica empresarial", "value": 3 }
		],
		dictionary_type_offer: { "contrato": 1, "prestaciones": 2, "practica_empresarial": 3 },
		dictionary_type_offer_filter: { 1: "contrato", 2: "prestaciones", 3: "practica_empresarial" },
		type_offer_value: '',
		type_offer_value_filter: '',
		checked: false,
		checkedFilter: true,
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
	handleSelectSearchFilter = async val => {
		//hacer la peticion con los parametros de filtrado
		await this.setState({
			page: {
				...this.state.page,
				search: {
					...this.state.page.search,
					status: 1,
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

		await this.setState({ checkedFilter: true })
		this.setState({ laboral_categories_value_filter: '' })
		this.setState({ type_offer_value_filter: '' })

		this.handlePageUser()
	}
	handleCheckedFilter = async val => {
		//hacer la peticion con los parametros de filtrado
		this.setState({
			checkedFilter: val
		})
		let status = 0
		if (val) {
			status = 1
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


	peticionGet = () => {
		authFetch(`${BASE_URL}api/job_offer/page`, {
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
		data.append('type_offer', this.state.type_offer_value)
		data.append('salary', this.state.form.salary)
		data.append('description', this.state.form.description)
		data.append('status', status)
		//console.warn(data);

		authFetch(`${BASE_URL}api/job_offer/create`, {
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
		data.append('type_offer', this.state.type_offer_value)
		data.append('salary', this.state.form.salary)
		data.append('description', this.state.form.description)
		data.append('status', status)

		authFetch(`${BASE_URL}api/job_offer/${this.state.form.id}/edit`, {
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

		authFetch(`${BASE_URL}/api/job_offer/${this.state.form.id}`, {
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
		if (this.state.modalInsertar) {
			this.setState({ checked: false })
			this.setState({ laboral_categories_value: '' })
			this.setState({ type_offer_value: '' })
		}
		this.setState({ modalInsertar: !this.state.modalInsertar });
	}

	modalShow = () => {
		this.setState({ modalShow: true })
		this.setState({ checked: false })
		this.setState({ laboral_categories_value: '' })
		this.setState({ type_offer_value: '' })

	}
	modalEliminar = () => {
		this.setState({ modalEliminar: true })
		this.setState({ checked: false })
		this.setState({ laboral_categories_value: '' })
		this.setState({ type_offer_value: '' })
	}

	seleccionarJobOffer = (job_offer) => {
		this.setState({
			tipoModal: 'actualizar',
			form: {
				id: job_offer.id,
				salary: job_offer.salary,
				description: job_offer.description,
			}
		})
		this.setState({ checked: job_offer.status })
		this.setState({ laboral_categories_value: job_offer.laboral_category_id })
		this.setState({ type_offer_value: this.state.dictionary_type_offer[job_offer.type_offer] })
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

	handleSelectSearch = val => {
		this.setState({
			laboral_categories_value: val
		})
	}

	handleSelectTypeOffer = val => {
		this.setState({
			type_offer_value: val
		})
	}
	handleSelectTypeOfferFilter = async val => {
		await this.setState({
			page: {
				...this.state.page,
				search: {
					... this.state.page.search,
					status: 1,
					type_offer: this.state.dictionary_type_offer_filter[val]
				}
			}
		})

		this.handleCheckedFilter(true)

		this.setState({
			type_offer_value_filter: val
		})
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
				<button className="btn btn-success" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar() }}>Agregar Oferta Laboral</button>
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
								placeholder="Filtro categoria laboral"
							/>
						</Col>
						<Col>
							<SelectSearch
								options={this.state.type_offer_options}
								value={this.state.type_offer_value_filter}
								onChange={this.handleSelectTypeOfferFilter}
								search
								filterOptions={fuzzySearch}
								placeholder="Filtro tipo de oferta"
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
										<th scope="col">Tipo de oferta</th>
										<th scope="col">Salario</th>
										<th scope="col">Descripcion</th>
										<th scope="col">Estado</th>
										<th scope="col">Opciones</th>
										<th scope="col"></th>
									</tr>
								</thead>
								<tbody>
									{this.state.data.map(job_offer => {

										return (
											<tr key={job_offer.id}>
												<th scope="row">{job_offer.id}</th>
												<td>{this.state.dictionary_categories[job_offer.laboral_category_id]}</td>
												<td>{job_offer.type_offer}</td>
												<td>{job_offer.salary}</td>
												<td>{job_offer.description}</td>
												<td>
													<Switch
														onChange={this.handleChecked}
														checked={job_offer.status}
														className="react-switch"
													/>
												</td>
												<td>
													{"   "}
													<button className="btn btn-warning" onClick={() => { this.seleccionarJobOffer(job_offer); this.modalShow() }}><FontAwesomeIcon icon={faEye} /></button>
													{"   "}
													<button className="btn btn-primary" onClick={() => { this.seleccionarJobOffer(job_offer); this.modalInsertar() }}><FontAwesomeIcon icon={faEdit} /></button>
													{"   "}
													<button className="btn btn-danger" onClick={() => { this.seleccionarJobOffer(job_offer); this.modalEliminar() }}><FontAwesomeIcon icon={faTrashAlt} /></button>
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
								<label htmlFor="laboral_category_id">Tipos de oferta</label>
								<SelectSearch
									options={this.state.type_offer_options}
									value={this.state.type_offer_value}
									onChange={this.handleSelectTypeOffer}
									search
									filterOptions={fuzzySearch}
									placeholder="Search something"
								/>
								<br />
								<label htmlFor="salary">Salario</label>
								<input className="form-control" type="text" name="salary" id="salary" onChange={this.handleChange} value={form ? form.salary : ''} />
								<br />
								<label htmlFor="description">Descripcion</label>
								<input className="form-control" type="text" name="description" id="description" onChange={this.handleChange} value={form ? form.description : ''} />
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
						Estás seguro que deseas eliminar la oferta laboral<strong>{this.state.type_offer_value}</strong>
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
								<div className="text-center"> <img src={jobOffer} width="100" class="rounded-circle" alt="img about job offer" />
									<h3 className="mt-2">{this.state.type_offer_value}</h3> <span className="mt-1 clearfix">Tipo de Oferta</span>
									<div className="row mt-3 mb-3">
										<div className="col-md-12">
											<h5><strong>{this.state.dictionary_categories[this.state.laboral_categories_value]}</strong></h5> <span className="num">Categoria laboral</span>
										</div>
									</div>
									<div className="row mt-3 mb-3">
										<div className="col-md-12">
											<h6><strong>{form && form.description}</strong></h6> <span className="num">Descripcion</span>
										</div>
									</div>
									<div className="row mt-3 mb-3">
										<div className="col-md-6">
											<h5><strong>{form && form.salary}</strong></h5> <span className="num">Salario</span>
										</div>

										<div className="col-md-6">
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