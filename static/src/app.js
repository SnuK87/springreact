import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import Contact from './Contact';
import Register from './Register';
import Login from './Login';
import Stuff from './Stuff';
import Navbar from './Navbar';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import bootstrap from '../style/bootstrap.scss';


class App extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			user: 'null'
		}
	}

	render(){
		return(
		<div>
			<Navbar />
				<div className="container">
					{this.props.children}
				</div>

			</div>
    );
	}
}

var destination = document.querySelector("#container");

ReactDOM.render(
	<Router history={hashHistory}>
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
