import React from 'react';
import '../.././App.css';
import { Form, Button } from 'react-bootstrap';
import '../.././App.css';
import BASE_URL from '../../helpers/api_base'
import ReactNotificationComponent from "../notifications/ReactNotification";


export default class SingUpComponent extends React.Component {

	state = {
		nombre: '',
		email: '',
		password: '',
		error_dict: { "username": false, "email": false },
		show: false,
	}


	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleSubmit = async event => {

		event.preventDefault();

		const data = new FormData()
		let token_fcm = ""
		token_fcm = localStorage.getItem('token_fcm');

		data.append('username', this.state.nombre)
		data.append('password', this.state.password)
		data.append('email', this.state.email)
		data.append('role', this.props.roleUser)
		data.append('is_active', 0)
		data.append('token_fcm', token_fcm)

		fetch(`${BASE_URL}api/users/create`, {
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
			if (response.error_list) {
				let aux_error_dict = { "username": false, "email": false }
				for (var i = 0; i < response.error_list.length; i++) {
					aux_error_dict[response.error_list[i]] = true
				}

				this.setState({ error_dict: aux_error_dict })
				console.log(response.error_list)
			} else {
				this.setState({show:true})
			}

		})
	}

	render() {
		return (
			<>
				{this.state.show ? (
					<ReactNotificationComponent
						title={"Successful Registration"}
						body={"Now you can Login ..."}
					/>
				) : (
					<></>
				)}
				<Form method="POST" onSubmit={this.handleSubmit}>
					<Form.Group className="mb-3" controlId="nombre">
						<Form.Label>Username</Form.Label>
						<Form.Control type="text" name="nombre" placeholder="Enter your username" onChange={this.handleChange} />
						{this.state.error_dict.username ? <span className="error-input">username already exist</span> : <></>}
					</Form.Group>
					<Form.Group className="mb-3" controlId="email">
						<Form.Label>Email</Form.Label>
						<Form.Control type="email" name="email" placeholder="Enter your email" onChange={this.handleChange} />
						{this.state.error_dict.email ? <><span className="error-input">email already exits</span><br /></> : <></>}
						<Form.Text className="text-span">
							We'll never share your email with anyone else.
						</Form.Text>
					</Form.Group>

					<Form.Group className="mb-3" controlId="password">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" name="password" placeholder="Enter your password" onChange={this.handleChange} />
					</Form.Group>
					<Form.Group className="mb-3" controlId="btn-register">
						<input type="submit" className="btnRegister" value="Register" />
					</Form.Group>
				</Form>
			</>
		)
	}
}