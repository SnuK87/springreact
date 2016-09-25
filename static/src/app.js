import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import Contact from './Contact';
import Register from './Register';
import Login from './Login';
import Stuff from './Stuff';
import {Router, Route, IndexRoute, Link, IndexLink} from 'react-router';
import bootstrap from '../style/bootstrap.scss';


class App extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		return(
				<div>
			<nav className="navbar navbar-inverse">
				<div className="container-fluid">
				<ul className="nav navbar-nav">
					<li><IndexLink to="/">Home</IndexLink></li>
					<li><Link to="/stuff">Stuff</Link></li>
					<li><Link to="/contact">Contact</Link></li>
				</ul>
				<ul className="nav navbar-nav navbar-right">
					<li><Link to="/register"><span className="glyphicon glyphicon-user"></span> Sign Up</Link></li>
					<li><Link to="/login"><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>
				</ul>
				</div>
			</nav>
			<div className="container">
{this.props.children}
</div>
</div>
    );
	}
}

var destination = document.querySelector("#container");

ReactDOM.render(
	<Router>
    	<Route path="/" component={App}>
      	<IndexRoute component={Home}/>
			<Route path="contact" component={Contact} />
			<Route path="stuff" component={Stuff} />
			<Route path="login" component={Login} />
			<Route path="register" component={Register} />
  		</Route>
		</Router>,
  destination
);
