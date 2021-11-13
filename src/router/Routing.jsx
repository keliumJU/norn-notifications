import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../components/Home'
import Login from '../components/user/Login'
import Secret from '../components/user/Secret'
import Register from '../components/user/Register'
import User from '../components/user/User'
import {useAuth} from "./../auth"
import Role from "../helpers/role"
import jwt from 'jwt-decode'
function Routing() {

	const PrivateRoute = ({ component: Component, roles, ...rest }) => {
		const [logged] = useAuth();
		const token = JSON.parse(localStorage.getItem("REACT_TOKEN_AUTH_KEY"))
		const user = jwt(token.access_token)

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
					<Route path="/norn-notifications" exact component={Home} />
					<Route path="/norn-notifications/login" exact component={Login} />
					<Route path="/norn-notifications/register" exact component={Register} />
					<PrivateRoute path="/norn-notifications/secret" roles={[Role.Graduate, Role.Admin]} exact component={Secret} />
					<PrivateRoute path="/norn-notifications/user" roles={[Role.Admin]} exact component={User} />
			</Switch>
		</>
	)
}

export default Routing;