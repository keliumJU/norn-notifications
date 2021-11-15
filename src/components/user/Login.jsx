import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import {login, useAuth, logout} from "./../../auth"
import '../.././App.css';
import jwt from 'jwt-decode'
import BASE_URL from '../../helpers/api_base'
function Login() {

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const [logged] = useAuth();

	const onSubmitClick = (e) => {
		e.preventDefault()
		console.log("You pressed login")
		let token_fcm=localStorage.getItem('token_fcm');
		
		let opts = {
			'username': username,
			'password': password,
			'token_fcm': token_fcm
		}
		console.log(opts)
		fetch(`${BASE_URL}api/users/login`, {
			method: 'post',
			body: JSON.stringify(opts)
		}).then(r => r.json())
			.then(token => {
				if (token.access_token) {
					login(token)
					console.log(token)

					//Llamar a la funcion que agrega el token
				
				}
				else {
					console.log("Please type in correct username/password")
				}
			})
	}

	const handleUsernameChange = (e) => {
		setUsername(e.target.value)
	}

	const handlePasswordChange = (e) => {
		setPassword(e.target.value)
	}

	return (
		<div className="grid-login">
				{!logged? <Form action="#">
					<Form.Group className="mb-3" controlId="formBasicInput">
						<Form.Control type="text" name="username" placeholder="Username" onChange={handleUsernameChange} />
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Control type="password" name="password" placeholder="Password" onChange={handlePasswordChange} />
					</Form.Group>
					<Button variant="primary" type="submit" onClick={onSubmitClick}>
						Login Now
					</Button>
				</Form>
				: <Button onClick={()=>logout()}>Logout</Button>}
		</div>
	)
}

export default Login;