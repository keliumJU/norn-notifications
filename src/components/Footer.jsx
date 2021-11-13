import React from 'react';
import '../App.css'
import { Navbar, Nav, Container } from 'react-bootstrap';

function Footer() {
	return (
		<>
			<footer>
				<Navbar bg="dark" variant="dark">
					<Container>
						<Nav className="me-auto">
							<Nav.Link href="#home">Development with ❤️ by Norn</Nav.Link>
						</Nav>
					</Container>
				</Navbar>
			</footer>
		</>
	)
}

export default Footer;