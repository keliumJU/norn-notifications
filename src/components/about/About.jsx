import React, { useState, useEffect, useLocation } from 'react';
import '../../static/css/AboutStyle.css'
import itp from '../../static/images/itp_small.png'
import virtualab from '../../static/images/virtuallab.png'
import desarroyo from '../../static/images/desarroyo_small.png'
import director from '../../static/images/director.png'
import logoNorn from '../../logo_norn.png'
const About = props => {

	return (
		<>
			<div className="container">
				<div className="row">
					<div className="col-lg-12 m-5">
						<h3 className="text-center">About us</h3>
						<h6>
							Group organization and development the pillar of education in the department of putumayo
						</h6>
						<ul className="timeline">
							<li>
								<div className="timeline-image">
									<img className="img-circle img-responsive" height="189" width="180" src={itp} alt="Instituto tecnologico del putumayo" />
								</div>
								<div className="timeline-panel">
									<div className="timeline-heading">
										<h4>Instituto Tecnológico del Putumayo</h4>
										<h4 className="subheading">Higher education</h4>
									</div>
									<div className="timeline-body">
										<p className="text-muted">
											The <a href="https://itp.edu.co/web2016/" target="_blank">Technological Institute of Putumayo</a>, is a public institution of Higher Education, committed to regional development, dedicated to the training of technicians, technologists and professionals through Propedeutic Cycles to train leading citizens in the transformation of their environment.
										</p>
									</div>
								</div>
								<div className="line"></div>
							</li>
							<li className="timeline-inverted">
								<div className="timeline-image">
									<img className="img-circle img-responsive" height="150" width="200" src={virtualab} alt="Grupo de investigacion Virtual Lab" />
								</div>
								<div className="timeline-panel">
									<div className="timeline-heading">
										<h4>Virtual Lab</h4>
										<h4 className="subheading">Investigation Group</h4>
									</div>
									<div className="timeline-body">
										<p className="text-muted">
											The research group "VIRTUA LAB" has the mission of generating, adapting and integrating knowledge with an interdisciplinary approach around systems engineering, through research, teaching and extension to contribute to a better use and adaptation of technological tools in different areas of knowledge and achieve better social development.
										</p>
									</div>
								</div>
								<div className="line"></div>
							</li>
							<li>
								<div className="timeline-image">
									<img className="img-circle img-responsive" height="100" width="250" src={desarroyo} alt="programa que impulsa el desarrollo de productos de software" />
								</div>
								<div className="timeline-panel">
									<div className="timeline-heading">
										<h4>DesarroYo</h4>
										<h4 className="subheading">Service Production Group</h4>
									</div>
									<div className="timeline-body">
										<p className="text-muted">
											People united to create products for the educational community without any profit motive
										</p>
									</div>
								</div>
								<div className="line"></div>
							</li>
							<li className="timeline-inverted">
								<div className="timeline-image">
									<img className="img-circle img-responsive" height="150" width="150" src={director} alt="" />
								</div>

								<div className="timeline-panel">
									<div className="timeline-heading">
										<h4>Program Director</h4>
										<h4 className="subheading">Esp Jhon Henry Cuellar</h4>
									</div>
									<div className="timeline-body">
										<p className="text-muted">
											Person in charge of directing all kinds of projects in the engineering faculty of the systems engineering program
										</p>
									</div>
								</div>
								<div className="line"></div>
							</li>
							<li>
								<div className="timeline-image">
									<img className="img-circle img-responsive" height="150" width="150" src={logoNorn} alt="" />
								</div>
								<div className="timeline-panel">
									<div className="timeline-heading">
										<h4>Norn Inc</h4>
										<h4 className="subheading">Norn noritifications</h4>
									</div>
									<div className="timeline-body">
										<p className="text-muted">
											Startup in charge of developing and maintaining the "norn nortifications" system
										</p>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	)
}
//export default Home;
export default About;
