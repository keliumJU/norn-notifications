import React from 'react';
import '../App.css'
import { Navbar, Nav, Container } from 'react-bootstrap';
import logoNorn from '../logo_norn.png';

function Footer() {
	/*
	
			<footer className="mt-auto">

				<Navbar bg="dark" variant="dark">
					<Container>
						<Nav className="me-auto">
							<Nav.Link href="#home">Development with ❤️ by Norn</Nav.Link>
						</Nav>
					</Container>
				</Navbar>
			</footer>
	*/
	return (
		<>
			<footer className="container py-5 mt-auto">
				<div className="row">
					<div className="col-12 col-md">
						<img src={logoNorn} width="24" height="24" alt="logo norn notifications" />
						<small className="d-block mb-3 text-muted">&copy; 2021-2022</small>
					</div>
					<div className="col-6 col-md">
						<h5>Features</h5>
						<ul className="list-unstyled text-small">
							<li><a className="text-muted" href="#">Cool stuff</a></li>
							<li><a className="text-muted" href="#">Random feature</a></li>
							<li><a className="text-muted" href="#">Team feature</a></li>
							<li><a className="text-muted" href="#">Stuff for developers</a></li>
							<li><a className="text-muted" href="#">Another one</a></li>
							<li><a className="text-muted" href="#">Last time</a></li>
						</ul>
					</div>
					<div className="col-6 col-md">
						<h5>Resources</h5>
						<ul className="list-unstyled text-small">
							<li><a className="text-muted" href="#">Resource</a></li>
							<li><a className="text-muted" href="#">Resource name</a></li>
							<li><a className="text-muted" href="#">Another resource</a></li>
							<li><a className="text-muted" href="#">Final resource</a></li>
						</ul>
					</div>
					<div className="col-6 col-md">
						<h5>Resources</h5>
						<ul className="list-unstyled text-small">
							<li><a className="text-muted" href="#">Business</a></li>
							<li><a className="text-muted" href="#">Education</a></li>
							<li><a className="text-muted" href="#">Government</a></li>
							<li><a className="text-muted" href="#">Gaming</a></li>
						</ul>
					</div>
					<div className="col-6 col-md">
						<h5>About</h5>
						<ul className="list-unstyled text-small">
							<li><a className="text-muted" href="#">Team</a></li>
							<li><a className="text-muted" href="#">Locations</a></li>
							<li><a className="text-muted" href="#">Privacy</a></li>
							<li><a className="text-muted" href="#">Terms</a></li>
						</ul>
					</div>
				</div>
			</footer>
		</>
	)
}

export default Footer;