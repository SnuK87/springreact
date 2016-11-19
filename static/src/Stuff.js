import React from 'react';
import Test from './Test';
import $ from 'jquery';

export default class Stuff extends React.Component {
	constructor(props){
		super(props);

		this.state = {
				lists: [],
				selectValue: '',
				learnMode: false
		};

		this.onSelectChange = this.onSelectChange.bind(this)
		this.initLearn = this.initLearn.bind(this)

	}

	componentWillMount(){
		$.ajax({
			type: "GET",
			contentType: "application/json",
			url: "http://localhost:8080/lists",
			dataType: 'json',
			success: function(result){
							this.setState({
								lists: result,
								selectValue: result[0].name
							});
						}.bind(this)
			});
		}


		initLearn(){
			$.ajax({
				type: "GET",
				contentType: "application/json",
				url: "http://localhost:8080/list?name=" + this.state.selectValue,
				dataType: 'json',
				success: function(result){
								this.setState({
									items: result,
									learnMode: true
								});
							}.bind(this)
				});
		}

		onSelectChange(event){
				this.setState({selectValue: event.target.value});
		}

	render(){
      return (
        <div>
          <h2>STUFF</h2>
					<form className="form-inline">
					<div className="form-group">
					<label htmlFor="sel1">Select:</label>
					<select className="form-control" id="sel1" onChange={this.onSelectChange} value={this.state.selectValue}>
						{this.state.lists.map(function(list, i){
							return <option key={list.id}>{list.name}</option>
						})}
					</select>
					</div>
		<button type="submit" className="btn btn-primary" onClick={this.initLearn}>Start</button>
	</form>
	{this.state.learnMode ? <Test /> : null}


        </div>
      );
	}
}
