import React, { useState, useEffect } from 'react';
import BASE_URL from '../../helpers/api_base'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import jobOfferImg from '../../job_offer.png';

function JobOfferView() {

	const { id } = useParams();
	const [jobOffer, setJobOffer] = useState({})
	const [laboralCategoriesDict, setLaboralCategoriesDict] = useState([])
	const [company, setCompany] = useState({})

	useEffect(() => {

		const fetchJobOffer = async () => {

			let url = `${BASE_URL}api/job_offer/${id}`

			try {
				const response = await fetch(url);
				const json = await response.json();
				setJobOffer(json[0].job_offer)
				fetchCompany(json[0].job_offer.user_id);
			} catch (error) {
				//console.log("error", error);
			}
		};
		const fetchLaboralCategories = async () => {

			let url = `${BASE_URL}api/laboral_category/all`

			try {
				const response = await fetch(url);
				const json = await response.json();
				let obj = {}
				for (let i = 0; i < json.length; i++) {
					var val = json[i].id
					obj[val] = json[i].name
				}
				setLaboralCategoriesDict(obj)
			} catch (error) {
				//console.log("error", error);
			}
		};

		const fetchCompany = async (id_company) => {

			let url = `${BASE_URL}api/users/${id_company}`

			try {
				const response = await fetch(url);
				const json = await response.json();
				setCompany(json[0].user)
			} catch (error) {
				//console.log("error", error);
			}
		};
		fetchJobOffer();
		fetchLaboralCategories();
	}, []);


	return (
		<>
			<div className="row m-3">
				<h2>
					perfil de la compañia: &nbsp;
					<Link to={`/user_profile_view/${company.id}`}><strong>{company.email}</strong></Link>
				</h2>
			</div>
			<div className="row m-3">
				<div className="container d-flex justify-content-center">
					<div className="card p-3 py-4">
						<div className="text-center"> <img src={jobOfferImg} width="100" className="rounded-circle" alt="img about job offer" />
							<h3 className="mt-2">{jobOffer.type_offer}</h3> <span className="mt-1 clearfix">Tipo de Oferta</span>
							<div className="row mt-3 mb-3">
								<div className="col-md-12">
									<h5><strong>{laboralCategoriesDict[jobOffer.laboral_category_id]}</strong></h5> <span className="num">Categoria laboral</span>
								</div>
							</div>
							<div className="row mt-3 mb-3">
								<div className="col-md-12">
									<h6><strong>{jobOffer.description ? jobOffer.description : 'sin descripcion'}</strong></h6> <span className="num">Descripcion</span>
								</div>
							</div>
							<div className="row mt-3 mb-3">
								<div className="col-md-6">
									<h5><strong>{jobOffer.salary ? jobOffer.salary : 'sin salario'}</strong></h5> <span className="num">Salario</span>
								</div>

								<div className="col-md-6">
									<h5><strong>{jobOffer.status ? 'Activo' : 'Inactivo'}</strong></h5> <span className="num">Estado</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
export default JobOfferView