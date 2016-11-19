import React from 'react';

export default class Test extends React.Component {

  constructor(props){
    super(props);

    this.state = {
        lists: [],
        inputVocab: ''
    };
  }

  onInputVocab(event){
  	this.setState({
  		inputVocab: event.target.value
  	});
  }

  onClickNext(event){

  }

  render(){
    return (
      <div>
      <form className="form-inline">
      <div className="form-group">
        <input type="text" className="form-control" id="usr" placeholder="add vocabulary" onInput={this.onInputVocab} value={this.state.inputVocab}/>
      </div>
      <div className="form-group">
      <button type="submit" className="btn btn-primary" onClick={this.onClickNext}>Next</button>
      </div>
      </form>
      </div>
    );
  }

}
