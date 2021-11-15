import React from 'react';
import '../.././App.css';
import { Form, Button } from 'react-bootstrap';
import API from '../../api/api'
import '../.././App.css';
import BASE_URL from '../../helpers/api_base'

export default class Register extends React.Component {

	state = {
		nombre: '',
		email: '',
		password: '',
	}


	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleSubmit = async event => {

		event.preventDefault();

		const data = new FormData()
		let token_fcm=""
		token_fcm=localStorage.getItem('token_fcm');

		data.append('username', this.state.nombre)
		data.append('password', this.state.password)
		data.append('email', this.state.email)
		data.append('role', "graduate")
		data.append('is_active', 0)
		data.append('token_fcm', token_fcm)

		console.log("data noti now")
		console.log(token_fcm)
		console.log(this.state.nombre)

		fetch(`${BASE_URL}api/users/create`, {
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
				console.log(response)
			}
		})
	}

	render() {
		return (
			<>
				<Form method="POST" onSubmit={this.handleSubmit}>
					<Form.Group className="mb-3" controlId="formBasicInput">
						<Form.Label>Username</Form.Label>
						<Form.Control type="text" name="nombre" placeholder="Username" onChange={this.handleChange} />
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicInput">
						<Form.Label>Email</Form.Label>
						<Form.Control type="email" name="email" placeholder="Email" onChange={this.handleChange} />
						<Form.Text className="text-muted">
							We'll never share your email with anyone else.
						</Form.Text>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" name="password" placeholder="Password" onChange={this.handleChange} />
					</Form.Group>
					<Button variant="primary" type="submit"  >
						Submit
					</Button>
				</Form>
			</>
		)
	}
}