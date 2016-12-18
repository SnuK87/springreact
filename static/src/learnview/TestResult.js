import React from 'react';

export default class TestResult extends React.Component {

  constructor(props){
    super(props);

  //  this.state = {

  //  };
  }

  render(){

    var rows = [];
    var correctCount = 0;

    for (var i = 0; i < this.props.vocabs.length; i++){
      rows.push(
      <tr key = {i}>
        <td>{this.props.vocabs[i].korean}</td>
        <td>{this.props.vocabs[i].english}</td>
        <td>{this.props.inputs[i]}</td>
        <td>{this.props.vocabs[i].english === this.props.inputs[i] ? 'OK' : 'NOK'}</td>
      </tr>);

      if(this.props.vocabs[i].english === this.props.inputs[i]){
        correctCount = correctCount + 1;
      }
    }

    var n = this.props.vocabs.length;
    var x = ((correctCount / n) * 100).toFixed(0);


//    this.setState({
//      correct: x
//    });



    return(
      <div>
      <h1>{x}</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Korean</th>
            <th>English</th>
            <th>Input</th>
            <th>Correct</th>
          </tr>
        </thead>
        <tbody>
        {rows}
      	</tbody>
      </table>
      <div className="progress">
        <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{width: x + '%'}}>
        {x}%
        </div>
      </div>
      </div>
    );
  }
}
