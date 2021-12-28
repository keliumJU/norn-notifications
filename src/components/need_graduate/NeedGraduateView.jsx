import React, { useState, useEffect } from 'react';
import BASE_URL from '../../helpers/api_base'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import necesidadGraduado from '../../need_graduate.jpg';
function NeedGraduateView() {

	const { id } = useParams();
	const [needGraduate, setNeedGraduate] = useState({})
	const [laboralCategoriesDict, setLaboralCategoriesDict] = useState([])
	const [graduate, setGraduate] = useState({})

	useEffect(() => {
		const fetchNeedGraduate = async () => {

			let url = `${BASE_URL}api/need_graduate/${id}`

			try {
				const response = await fetch(url);
				const json = await response.json();
				setNeedGraduate(json[0].need_graduate)
				fetchGraduate(json[0].need_graduate.user_id);
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

		const fetchGraduate = async (id_company) => {

			let url = `${BASE_URL}api/users/${id_company}`

			try {
				const response = await fetch(url);
				const json = await response.json();
				setGraduate(json[0].user)
			} catch (error) {
				//console.log("error", error);
			}
		};
		fetchNeedGraduate();
		fetchLaboralCategories();
	}, []);


	return (
		<>
			<div className="row m-3">
				<h2>
					perfil del graduado: &nbsp;
					<Link to={`/user_profile_view/${graduate.id}`}><strong>{graduate.email}</strong></Link>
				</h2>
			</div>
			<div className="row m-3">
				<div className="container d-flex justify-content-center">
					<div className="card p-3 py-4">
						<div className="text-center"> <img src={necesidadGraduado} width="100" className="rounded-circle" alt="img aobut need graduate" />
							<h3 className="mt-2">{laboralCategoriesDict[needGraduate.laboral_category_id]}</h3> <span className="mt-1 clearfix">Tipo de categoria</span>
							<div className="row mt-3 mb-3">
								<div className="col-md-12">
									<h5><strong>{needGraduate.status ? 'Activo' : 'Inactivo'}</strong></h5> <span className="num">Estado</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
export default NeedGraduateView