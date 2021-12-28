import React, { Component } from 'react';
import '../.././App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Row, Col, Container } from 'react-bootstrap';
import { authFetch } from "./../../auth"

import puestosInformaticos from '../../puestos_informaticos.jpg';
import BASE_URL from '../../helpers/api_base'


class LaboralCategories extends Component {
	state = {
		data: [],
		modalInsertar: false,
		modalEliminar: false,
		modalShow: false,
		form: {
			id: '',
			name: '',
			description: '',
			tipoModal: ''
		},
		page: {
			search: null,
			page_number:0
		},
		LIMIT_PER_PAGE: 10,
	}
	
	peticionGet = () => {
		authFetch(`${BASE_URL}api/laboral_category/page`, {
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

	peticionPost = async () => {
		const data = new FormData()
		data.append('name', this.state.form.name)
		data.append('description', this.state.form.description)
		//console.warn(data);

		authFetch(`${BASE_URL}api/laboral_category/create`, {
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
		const data = new FormData()

		data.append('name', this.state.form.name)
		data.append('description', this.state.form.description)

		authFetch(`${BASE_URL}api/laboral_category/${this.state.form.id}/edit`, {
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

	authFetch(`${BASE_URL}/api/laboral_category/${this.state.form.id}`, {
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
	}

	seleccionarLaboralCategory = (laboral_categories) => {
		this.setState({
			tipoModal: 'actualizar',
			form: {
				id: laboral_categories.id,
				name: laboral_categories.name,
				description: laboral_categories.description,
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
	}


	handleSearch = async e => {
		e.preventDefault();
		const form = e.target;
		const searching = form.search.value;
		const searchPage = {
			search: {
				name: searching,
			},
			page_number:0
		}

		this.setState({
			page: searchPage
		})
		await authFetch(`${BASE_URL}api/laboral_category/page`, {
			method: 'POST',
			body: JSON.stringify(searchPage),
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
				console.log(this.state.data.length)
			}
		})

	}

	//Determinate where the button have active ... in base to count of register in the response
	handlePageBefore = async e => {
		e.persist();
		var inic = this.state.page.page_number-1
		await this.setState({
			page: {
				...this.state.page,
				page_number:inic
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
				page_number:inic
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
				<button className="btn btn-success" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar() }}>Agregar Categorias Laborales</button>
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
										<th scope="col">Name</th>
										<th scope="col">Description</th>
										<th scope="col">Options</th>
									</tr>
								</thead>
								<tbody>
									{this.state.data.map(laboral_categories => {

										return (
											<tr key={laboral_categories.id}>
												<th scope="row">{laboral_categories.id}</th>
												<td>{laboral_categories.name}</td>
												<td>{laboral_categories.description}</td>
												<td>
													{"   "}
													<button className="btn btn-warning" onClick={() => { this.seleccionarLaboralCategory(laboral_categories); this.setState({ modalShow: true }) }}><FontAwesomeIcon icon={faEye} /></button>
													{"   "}
													<button className="btn btn-primary" onClick={() => { this.seleccionarLaboralCategory(laboral_categories); this.modalInsertar() }}><FontAwesomeIcon icon={faEdit} /></button>
													{"   "}
													<button className="btn btn-danger" onClick={() => { this.seleccionarLaboralCategory(laboral_categories); this.setState({ modalEliminar: true }) }}><FontAwesomeIcon icon={faTrashAlt} /></button>
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
								this.state.page.page_number=== 0 ? true : false
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
								<label htmlFor="name">Name</label>
								<input className="form-control" type="text" name="name" id="name" onChange={this.handleChange} value={form ? form.name: ''} required />
								<br />
								<label htmlFor="description">Description</label>
								<input className="form-control" type="text" name="description" id="description" onChange={this.handleChange} value={form ? form.description : ''} />
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
						Estás seguro que deseas eliminar la categoria laboral<strong>{form && form.name}</strong>
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
								<div className="text-center"> <img src={puestosInformaticos} width="100" class="rounded-circle" alt="img about perfil of informatic worker"/>
									<h3 className="mt-2">{form&&form.name}</h3> <span className="mt-1 clearfix">{form&&form.email}</span>
									<div className="row mt-3 mb-3">
										<div className="col-md-6">
											<h5>{form&&form.name}</h5> <span className="num">name</span>
										</div>
										<div className="col-md-6">
											<h5>{form&&form.description}</h5> <span className="num">description</span>
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
export default LaboralCategories;