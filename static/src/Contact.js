import React from 'react';

const divStyle = {
	margin: '0px 50px 0px 0px',
};

const dStyle = {
	margin: '0px 10px 0px 0px',
};

export default class Contact extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
      return (
        <div>
          <h2>GOT QUESTIONS?</h2>
				<form className="form-inline">
				<div className="form-group" style={divStyle}>
 				<label htmlFor="sel1" style={dStyle}>Select</label>
 				<select className="form-control" id="sel1">
	 			<option>11111111111</option>
 			</select>
				</div>
  <div className="form-group">
    <label htmlFor="email" style={dStyle}>Or create a new List </label>
    	<input type="text" className="form-control" id="email" />
  </div>
  <button type="submit" className="btn btn-info">+</button>
</form>

<table className="table table-striped">
	<thead>
		<tr>
			<th>English</th>
			<th>Korean</th>
			<th>pronounciation</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>John</td>
			<td>Doe</td>
			<td>john@example.com</td>
		</tr>
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
