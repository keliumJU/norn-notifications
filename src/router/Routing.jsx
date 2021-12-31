import React from 'react';
import {Switch, Route, Redirect } from 'react-router-dom';
import Home from '../components/Home'
import Login from '../components/user/Login'
import Secret from '../components/user/Secret'
import Register from '../components/user/Register'

import User from '../components/user/User'
import UserAccountView from '../components/user/UserView'

import LaboralCategories from '../components/laboral_categories/LaboralCategories'
import NeedGraduate from '../components/need_graduate/NeedGraduate'
import NeedGraduateView from '../components/need_graduate/NeedGraduateView'

import JobOffer from '../components/job_offer/JobOffer'

import UserProfile from '../components/user_profile/UserProfile'
import UserProfileView from '../components/user_profile/UserProfileView'

import NotificationList from '../components/NotificationsList/NotificationList'
import JobOfferView from '../components/job_offer/JobOfferView'


import About from '../components/about/About'

import {useAuth} from "./../auth"
import Role from "../helpers/role"
import jwt from 'jwt-decode'




function Routing() {

	const PrivateRoute = ({ component: Component, roles, ...rest }) => {
		const [logged] = useAuth();
		const token = JSON.parse(localStorage.getItem("REACT_TOKEN_AUTH_KEY"))
		let user
		if(token){
			user = jwt(token.access_token)
		}

		if(logged){
			if(roles && roles.indexOf(user.rls)===-1){
				return <Route {...rest} render={(props) => (
					<Redirect to='/' />
				)} />
			
			}else{
				return <Route {...rest} render={(props) => (
					<Component {...props} />
				)} />
			}
		}else{
			return <Route {...rest} render={(props) => (
					<Redirect to='/login' />
				)} />
			}
		}


		return (
			<>
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/login" exact component={Login} />
					<Route path="/register" exact component={Register} />
					<Route path="/about/" exact component={About} />
					<PrivateRoute path="/secret" roles={[Role.Graduate, Role.Admin]} exact component={Secret} />
					<PrivateRoute path="/user" roles={[Role.Admin]} exact component={User} />
					<PrivateRoute path="/user_account_view/:id" roles={[Role.Admin]} exact component={UserAccountView} />
					<PrivateRoute path="/laboral_categories" roles={[Role.Admin, Role.Graduate, Role.Company]} exact component={LaboralCategories} />
					<PrivateRoute path="/need_graduate" roles={[Role.Graduate]} exact component={NeedGraduate} />
					<PrivateRoute path="/need_graduate_view/:id" roles={[Role.Admin,Role.Company,Role.Graduate]} exact component={NeedGraduateView} />
					<PrivateRoute path="/job_offer" roles={[Role.Company]} exact component={JobOffer} />
					<PrivateRoute path="/user_profile/" roles={[Role.Admin, Role.Graduate, Role.Company]} exact component={UserProfile} />
					<PrivateRoute path="/user_profile_view/:id" roles={[Role.Admin, Role.Graduate, Role.Company]} exact component={UserProfileView} />
					<PrivateRoute path="/notification_list" roles={[Role.Admin, Role.Graduate, Role.Company]} exact component={NotificationList} />
					<PrivateRoute path="/job_offer_view/:id" roles={[Role.Admin, Role.Graduate, Role.Company]} exact component={JobOfferView} />
			</Switch>
		</>
	)
}

export default Routing;