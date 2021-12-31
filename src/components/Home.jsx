import React, { useState, useEffect, useLocation } from 'react';
import '../App.css'
import '../static/css/Product.css'

// msg boostrap config
import { Button, Row, Toast } from 'react-bootstrap'
import { login, useAuth, logout } from "./../auth"


import { useHistory } from "react-router-dom";
import ReactNotificationComponent from "./notifications/ReactNotification";


const Home = props => {

	return (
		<>
			<div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
				<div className="col-md-5 p-lg-5 mx-auto my-5">
					<h1 className="display-4 font-weight-normal">Norn Notifications</h1>
					<h6 className="lead font-weight-normal">Let us help you find a possible job offer in the place where you graduated, supported by the Putumayo Technological Institute.</h6>
					<a className="btn btn-outline-secondary" href="#">Coming soon</a>
				</div>
				<div className="product-device box-shadow d-none d-md-block"></div>
				<div className="product-device product-device-2 box-shadow d-none d-md-block"></div>
			</div>

			<div className="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
				<div className="bg-dark mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden">
					<div className="my-3 py-3">
						<h2 className="display-5">Job Offer</h2>
						<p className="lead">Job offers of all the companies available in our system in the department of putumayo</p>
					</div>
					<div className="bg-light box-shadow mx-auto" style={{ width: "80%", height: "300px", borderRadius: "21px 21px 0 0" }}></div>
				</div>
				<div className="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
					<div className="my-3 p-3">
						<h2 className="display-5">Need Graduate</h2>
						<h6 className="lead">Enter your need as a graduate in the technology area as frontend, backend, analyst, designer among others.</h6>
					</div>
					<div className="bg-dark box-shadow mx-auto" style={{ width: "80%", height: "300px", borderRadius: "21px 21px 0 0" }}></div>
				</div>
			</div>

			<div className="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
				<div className="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
					<div className="my-3 p-3">
						<h2 className="display-5">Laboral Categories</h2>
						<h6 className="lead">We add job categories based on your needs, we appreciate any feedback.</h6>
					</div>
					<div className="bg-dark box-shadow mx-auto" style={{ width: "80%", height: "300px", borderRadius: "21px 21px 0 0" }} ></div>
				</div>
				<div className="bg-primary mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden">
					<div className="my-3 py-3">
						<h2 className="display-5">User Admin</h2>
						<h6 className="lead">We have a panel to easily manage users and identify if they belonged to the Putumayo Technological Institute</h6>
					</div>
					<div className="bg-light box-shadow mx-auto" style={{ width: "80%", height: "300px", borderRadius: "21px 21px 0 0" }}></div>
				</div>
			</div>

			<div className="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
				<div className="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
					<div className="my-3 p-3">
						<h2 className="display-5">Notifications in base your need</h2>
						<h6 className="lead">You are notified of any available offerings based on your graduate needs. just make sure to allow our notifications</h6>
					</div>
					<div className="bg-white box-shadow mx-auto" style={{ width: "80%", height: "300px", borderRadius: "21px 21px 0 0" }}></div>
				</div>
				<div className="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
					<div className="my-3 py-3">
						<h2 className="display-5">Messages and email verification</h2>
						<h6 className="lead">Comming soon.</h6>
					</div>
					<div className="bg-white box-shadow mx-auto" style={{ width: "80%", height: "300px", borderRadius: "21px 21px 0 0" }}></div>
				</div>
			</div>
		</>
	)
}
//export default Home;
export default Home;
