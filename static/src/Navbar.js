import React from 'react';
import {Link, IndexLink} from 'react-router';

export default class Navbar extends React.Component{
  constructor(props){
		super(props);
	}


	render(){
    if(this.props.user == 'null'){
      return (

        <nav className="navbar navbar-inverse">
  				<div className="container-fluid">
            <ul className="nav navbar-nav">
              <li><IndexLink to="/">Home</IndexLink></li>
              <li><Link to="/stuff">Stuff</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li>{this.props.user}</li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><Link to="/register"><span className="glyphicon glyphicon-user"></span> Sign Up</Link></li>
              <li><Link to="/login"><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>
            </ul>
  				</div>
  			</nav>
      );
    }else{
      return (<div>Test</div>);
    }



	}
}
