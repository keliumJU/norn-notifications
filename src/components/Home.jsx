import React,{useState} from 'react';
import '../App.css'

// msg boostrap config
import { Button, Row, Col, Toast } from 'react-bootstrap'

function Home() {
	const [show, setShow] = useState(false);
	const handleSubscription = () => {
		//Send the token to server
		setShow(true)
	}
	return (
		<>
			<h1>Home</h1>
			<Toast onClose={() => setShow(false)} show={show} delay={3000} autohide animation style={{
				position: 'absolute',
				top: 20,
				right: 20,
			}}>
				<Toast.Header>
					<img
						src="holder.js/20x20?text=%20"
						className="rounded mr-2"
						alt=""
					/>
					<strong className="mr-auto">Notification</strong>
					<small>12 mins ago</small>
				</Toast.Header>
				<Toast.Body>There are some new updates that you might love!</Toast.Body>
			</Toast>
			<Row>
			<Button onClick={handleSubscription}>Suscribe for notifications</Button>
			</Row>

		</>
	)
}

export default Home;
