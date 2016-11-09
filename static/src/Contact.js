import React from 'react';
import Autosuggest from 'react-autosuggest';
import $ from 'jquery';

const divStyle = {
	margin: '0px 50px 0px 0px',
};

const dStyle = {
	margin: '0px 10px 0px 0px',
};

export default class Contact extends React.Component {
	constructor(props){
		super(props);

		this.state = {
				lists: [],
				items: [],
				inputListName: '',
				selectValue: ''
		};

		this.onSelectChange = this.onSelectChange.bind(this)
		this.onClickAddList = this.onClickAddList.bind(this)
		this.onInput = this.onInput.bind(this)
	}

componentWillMount(){
	$.ajax({
		type: "GET",
		contentType: "application/json",
		url: "http://localhost:8080/lists",
		// data: JSON.stringify("TEST"),
		dataType: 'json',
		success: function(result){
						this.setState({lists: result});

						$.ajax({
							type: "GET",
							contentType: "application/json",
							url: "http://localhost:8080/list?name=" + this.state.lists[0].name,
							// data: JSON.stringify("TEST"),
							dataType: 'json',
							success: function(result){
											this.setState({items: result});
										}.bind(this)
							});

					}.bind(this)
		});
	}

	onSelectChange(event){
		$.ajax({
			type: "GET",
			contentType: "application/json",
			url: "http://localhost:8080/list?name=" + event.target.value,
			// data: JSON.stringify("TEST"),
			dataType: 'json',
			success: function(result){
							this.setState({items: result});
						}.bind(this)
			});

			this.setState({selectValue: event.target.value});
	}

onInput(event){
	this.setState({
		inputListName: event.target.value
	});
}

	onClickAddList(event){
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: "http://localhost:8080/saveList",
			//data: JSON.stringify("INPUT"),
			data: this.state.inputListName,
			dataType: 'json',
			success: function(result){
				this.setState({inputListName: ''});
				this.setState({lists: this.state.lists.concat(result)});
				this.setState({selectValue: result.name});
						}.bind(this)
			});
	}

	render(){
      return (
        <div>
          <h2>Header</h2>
				<form className="form-inline">
				<div className="form-group" style={divStyle}>
 				<label htmlFor="sel1" style={dStyle}>Select</label>
 				<select className="form-control" id="sel1" onChange={this.onSelectChange} value={this.state.selectValue}>
					{this.state.lists.map(function(list, i){
						return <option key={list.id}>{list.name}</option>
					})}
 				</select>
				</div>
  <div className="form-group">
    <label htmlFor="listName" style={dStyle}>Or create a new List </label>
    	<input type="text" className="form-control" id="listName" placeholder="Enter name ..." onInput={this.onInput} value = {this.state.inputListName}/>
  </div>
  <button type="submit" className="btn btn-info" onClick={this.onClickAddList}>+</button>
</form>

<table className="table table-striped">
	<thead>
		<tr>
			<th>English</th>
			<th>Korean</th>
			<th>Pronounciation</th>
		</tr>
	</thead>
	<tbody>
		{this.state.items.map(function(item, i){
			return <tr><td>{item.english}</td><td>{item.korean}</td><td>{item.pronounciation}</td></tr>
		})}
	</tbody>
</table>

<form className="form-inline">
<div className="form-group">
	<label for="usr"></label>
	<input type="text" className="form-control" id="usr" placeholder="add vocabulary" />
</div>
<div className="form-group">
<button type="submit" className="btn btn-info">+</button>
</div>
</form>
        </div>
      );
	}
}
