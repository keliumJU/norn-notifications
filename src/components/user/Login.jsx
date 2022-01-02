import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { login } from "./../../auth"
import '../.././App.css';
import BASE_URL from '../../helpers/api_base'
import { useHistory } from "react-router-dom";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()
const Login = (props) => {

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [err, setErr] = useState(false)
	const [show, setShow] = useState(false)
	//const [state, setState] = useState({showToast:false})

	let history = useHistory();

	const onSubmitClick = (e) => {
		e.preventDefault()
		let token_fcm = localStorage.getItem('token_fcm');

		let opts = {
			'username': username,
			'password': password,
			'token_fcm': token_fcm
		}
		fetch(`${BASE_URL}api/users/login`, {
			method: 'post',
			body: JSON.stringify(opts)
		}).then(r => r.json())
			.then(token => {
				if (token.access_token) {
					login(token)
					toast.success('Welcome To the Jungle ... Enjoy')
					history.push('/')
				}
				else {
					setErr(true)
					//console.log("Please type in correct username/password")
				}
			})
			.catch(
				error => { console.log("es un error de login", error) }
			);
	}

	const handleUsernameChange = (e) => {
		setUsername(e.target.value)
	}

	const handlePasswordChange = (e) => {
		setPassword(e.target.value)
	}

	return (
		<>
			<div className="abs-center">
				<div className="m-5">
					<Form action="#">
						{err ? <span className="error-input">Please type in correct<br /> username/password</span> : <></>}
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
				</div>
			</div>
		</>
	)
}

export default Login;