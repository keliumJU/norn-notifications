import React from 'react';
import '../App.css'
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';

function NavBar() {
	return (
		<>
			<Navbar bg="dark" variant="dark">
				<Container>
					<Link to='/'>
						<Navbar.Brand href="#home">
						<img
							alt=""
							src={logo}
							width="30"
							height="30"
							className="d-inline-block align-top"
						/>{' '}
						React Bootstrap
					</Navbar.Brand>
					</Link>
					<Nav className="mx-auto">
						<Link to='/login'>
							<Nav.Link href="#login">Login</Nav.Link>
						</Link>
						<Link to='/register'>
							<Nav.Link href="#Register">Register</Nav.Link>
						</Link>
						<Link to='/secret'>
							<Nav.Link href="#Secret">Secret</Nav.Link>
						</Link>
						<Link to='/user'>
								<Nav.Link href="#User">User</Nav.Link>
						</Link>
					</Nav>
				</Container>
			</Navbar>
		</>
	)
}

export default NavBar;