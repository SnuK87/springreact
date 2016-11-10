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
				inputVocab: '',
				selectValue: '',
				vocabs: []
		};

		this.onSelectChange = this.onSelectChange.bind(this)
		this.onClickAddList = this.onClickAddList.bind(this)
		this.onClickAddItemToList = this.onClickAddItemToList.bind(this)
		this.onClickDeleteItem = this.onClickDeleteItem.bind(this)
		this.onClickSaveList = this.onClickSaveList.bind(this)
		this.onInput = this.onInput.bind(this)
		this.onInputVocab = this.onInputVocab.bind(this)

	}

componentWillMount(){
	$.ajax({
		type: "GET",
		contentType: "application/json",
		url: "http://localhost:8080/lists",
		// data: JSON.stringify("TEST"),
		dataType: 'json',
		success: function(result){
						this.setState({
							lists: result,
							selectValue: result[0].name
						});

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

		$.ajax({
			type: "GET",
			contentType: "application/json",
			url: "http://localhost:8080/getVocabularies",
			// data: JSON.stringify("TEST"),
			dataType: 'json',
			success: function(result){
							this.setState({vocabs: result});
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

onInputVocab(event){
	this.setState({
		inputVocab: event.target.value
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
			this.setState({
				inputListName: '',
				lists: this.state.lists.concat(result),
				selectValue: result.name,
				items: []
			});

				this.setState({lists: this.state.lists.concat(result)});
				this.setState({selectValue: result.name});
						}.bind(this)
			});
	}

	onClickAddItemToList(event){
	//	alert(this.state.vocabs[0]);

	var vocabs = this.state.vocabs;

		for(var i = 0; i < vocabs.length; i++){
			if(vocabs[i].english === this.state.inputVocab){

				//only add when not on list

				this.setState({
					items: this.state.items.concat(vocabs[i]),
					inputVocab: ''
				});

				break;
			}
			else{
		//		alert("f");
			}
		}
	}

	onClickDeleteItem(event){
		var copyItems = this.state.items;
		copyItems.splice(event.target.id, 1);
		this.setState({items: copyItems});
	}

onClickSaveList(event){

var dataToSend = {
	listName: this.state.selectValue,
	vocabs: this.state.items
};


	console.log(this.state.items);
	$.ajax({
		type: "POST",
		contentType: "application/json",
		url: "http://localhost:8080/saveItems",
		//data: JSON.stringify("INPUT"),
		data: JSON.stringify(dataToSend),
		//JSON.stringify(
		//{
		//	listName: this.state.selectValue,
		//	vocabEnglish: this.state.items
	//	}),
		dataType: 'json',
		success: function(result){
			console.log(result);
		}

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
  <button type="submit" className="btn btn-primary" onClick={this.onClickAddList}>+</button>
</form>

<table className="table table-striped">
	<thead>
		<tr>
			<th>English</th>
			<th>Korean</th>
			<th>Pronounciation</th>
			<th>Delete</th>
		</tr>
	</thead>
	<tbody>
		{this.state.items.map(function(item, i){
			return <tr key={item.id}>
							<td>{item.english}</td>
							<td>{item.korean}</td>
							<td>{item.pronounciation}</td>
							<td><button type="button" className="btn btn-danger" id={i} onClick={this.onClickDeleteItem}>-</button></td>
						</tr>
		}.bind(this))}
	</tbody>
</table>

<form className="form-inline">
<div className="form-group">
	<label htmlFor="usr"></label>
	<input type="text" className="form-control" id="usr" placeholder="add vocabulary" onInput={this.onInputVocab} value={this.state.inputVocab}/>
</div>
<div className="form-group">
<button type="submit" className="btn btn-primary" onClick={this.onClickAddItemToList}>+</button>
</div>
<div className="form-group">
<button type="button" className="btn btn-success" onClick={this.onClickSaveList}>Save</button>
</div>
</form>
        </div>
      );
	}
}
