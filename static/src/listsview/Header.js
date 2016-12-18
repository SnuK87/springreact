import React from 'react';
import $ from 'jquery';

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputListName: '',
        };

        this.onSelectChange = this.onSelectChange.bind(this)
        this.onClickAddList = this.onClickAddList.bind(this)
        this.onInput = this.onInput.bind(this)
        this.onKeyPressAddList = this.onKeyPressAddList.bind(this)
    }

    onInput(event) {
        this.setState({inputListName: event.target.value});
    }

    onClickAddList(event) {

      var listName = this.state.inputListName;
      var lists = this.props.lists;
      for (var i = 0; i < lists.length; i++) {
        if(lists[i].name === listName){
          console.log("listname schon vergeben");
          //TODO Listname schon vorhanden
          return;
        }
      }

      this.props.onAddList(listName);
      this.setState({inputListName: ''});
    }

    onKeyPressAddList(event) {
        if (event.key === 'Enter') {
            this.onClickAddList();
        }
    }

    onSelectChange(event) {
        var selectedIndex = event.target.value;
        this.props.onListChange(selectedIndex);
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-6">
                    <div className="input-group">
                        <span className="input-group-addon">
                            <label htmlFor="sel1">Select List</label>
                        </span>
                        <select className="form-control" id="sel" onChange={this.onSelectChange} value={this.props.selectedValue}>
                            {this.props.lists.map(function(list, i) {
                                return <option key={i} value={i}>{list.name}</option>
                            })}
                        </select>
                    </div>
                </div>
                <div className="col-sm-2"></div>
                <div className="col-sm-4">
                    <div className="input-group">
                        <span className="input-group-addon">
                            <label htmlFor="listName">Create a new List</label>
                        </span>
                        <input type="text" className="form-control" id="listName" placeholder="Enter name ..." onInput={this.onInput} value={this.state.inputListName} onKeyPress={this.onKeyPressAddList}/>
                        <span className="input-group-btn">
                            <button className="btn btn-primary" onClick={this.onClickAddList}>+</button>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}
