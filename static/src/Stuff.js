import React from 'react';
import $ from 'jquery';

export default class Stuff extends React.Component {
	constructor(props){
		super(props);
	}

	handleClick(event){
		$.ajax({
			type: "GET",
			contentType: "application/json",
			url: "http://localhost:8080/login",
			// data: JSON.stringify("TEST"),
			dataType: 'json',
			success: function(result){
							alert(result);
							alert(result.name);
						 }
			});
	}

	render(){
      return (
        <div>
          <h2>STUFF</h2>
          <p>Mauris sem velit, vehicula eget sodales vitae,
          rhoncus eget sapien:</p>
          <ol>
            <li>Nulla pulvinar diam</li>
            <li>Facilisis bibendum</li>
            <li>Vestibulum vulputate</li>
            <li>Eget erat</li>
            <li>Id porttitor</li>
          </ol>
     <div onClick={this.handleClick}>
        You d this. Click to toggle.
      </div>
        </div>
      );
	}
}
