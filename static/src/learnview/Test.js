import React from 'react';
import TestResult from './TestResult';

export default class Test extends React.Component {

  constructor(props){
    super(props);

    this.state = {
        index: 0,
        inputVocab: '',
        inputs: [],
        done: false
    };

    this.onInputVocab = this.onInputVocab.bind(this)
    this.onClickNext = this.onClickNext.bind(this)

  }

  onInputVocab(event){
  	this.setState({
  		inputVocab: event.target.value
  	});
  }

  onClickNext(event){

    var i = this.state.index;
    var n = this.props.vocabs.length;

    if(i === n - 1){
      this.setState({
        done: true
      })
    }


    this.setState({
      index: this.state.index + 1,
      inputs: this.state.inputs.concat(this.state.inputVocab),
      inputVocab: ''
    });
  }

  render(){
    return (
      <div>
      {this.state.done ? <TestResult inputs = {this.state.inputs} vocabs = {this.props.vocabs}/> :
    //  {this.state.index}
    //  /
    //  {this.props.vocabs.length}
      <form className="form-inline">
      <div className="form-group">
      <label>{this.props.vocabs[this.state.index].korean}</label>
        <input type="text" className="form-control" id="usr" placeholder = "english" onInput={this.onInputVocab} value={this.state.inputVocab}/>
      </div>
      <div className="form-group">
      <button type="submit" className="btn btn-primary" onClick={this.onClickNext}>Next</button>
      </div>
      </form>
    }
      </div>
    );
  }
}
