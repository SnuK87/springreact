import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import Lists from './Lists';
import Register from './Register';
import Login from './Login';
import Learn from './Learn';
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
			<Route path="lists" component={Lists} />
			<Route path="learn" component={Learn} />
			<Route path="login" component={Login} />
			<Route path="register" component={Register} />
  		</Route>
		</Router>,
  destination
);
