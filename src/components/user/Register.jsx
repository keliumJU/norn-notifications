import React, { useState } from 'react';
import '../.././App.css';
import '../.././static/css/RegisterStyle.css';
import SingUpComponent from './SingUpComponent';
import { Link } from 'react-router-dom';

function Register() {
	const [graduateTab, setGraduateTab] = useState(true);
	const [companyTab, setCompanyTab] = useState(false);

	const handleGraduateTab = () => {
		setGraduateTab(true);
		setCompanyTab(false);
	}

	const handleCompanyTab = () => {
		setCompanyTab(true);
		setGraduateTab(false);
	}
	return (
		<>
			<div className="container register">
				<div className="row">
					<div className="col-md-3 register-left">
						<img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
						<h3>Welcome</h3>
						<p>You are 30 seconds away from making a living</p>
						<Link to='/login'>
							<input type="submit" name="" value="Login" /><br />
						</Link>

					</div>
					<div className="col-md-9 register-right">
						<ul className="nav nav-tabs nav-justified" id="myTab" role="tablist">
							<li className="nav-item">
								<button className={graduateTab ? 'nav-link active' : 'nav-link'} id="home-tab" onClick={handleGraduateTab}>
									Graduate
								</button>
							</li>
							<li className="nav-item">
								<button className={companyTab ? 'nav-link active' : 'nav-link'} id="profile-tab" onClick={handleCompanyTab}>
									Company
								</button>
							</li>
						</ul>

						<div className="tab-content" id="myTabContent">
							{
								graduateTab ?
									<div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
										<h3 className="register-heading">Apply as a Graduate</h3>
										<div className="row register-form">
											<div className="abs-center">
												<div className="col-md-6">
													<SingUpComponent roleUser={'graduate'}/>
												</div>
											</div>
										</div>
									</div>
									:
									<div className="tab-pane fade show active" id="profile" role="tabpanel" aria-labelledby="profile-tab">
										<h3 className="register-heading">Apply as a Company</h3>
										<div className="row register-form">
											<div className="abs-center">
												<div className="col-md-6">
													<SingUpComponent roleUser={'company'}/>
												</div>
											</div>
										</div>
									</div>
							}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
export default Register;