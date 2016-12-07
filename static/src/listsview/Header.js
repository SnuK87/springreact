import React from 'react';
import $ from 'jquery';

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputListName: '',
            selectValue: ''
        };

        this.onSelectChange = this.onSelectChange.bind(this)
        this.onClickAddList = this.onClickAddList.bind(this)
        this.onInput = this.onInput.bind(this)
    }

    onInput(event) {
        this.setState({inputListName: event.target.value});
    }

    onClickAddList(event) {
        $.ajax({
            type: "POST", contentType: "application/json", url: "http://192.168.1.24:8080/saveList",
            //data: JSON.stringify("INPUT"),
            data: this.state.inputListName,
            dataType: 'json',
            success: function(result) {
                this.props.onAddList(result.id, result);

                this.setState({inputListName: '', selectValue: result.id});
            }.bind(this)
        });
    }

    onSelectChange(event) {

        var listId = event.target.value;

        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "http://192.168.1.24:8080/list?id=" + listId,
            dataType: 'json',
            success: function(result) {
                this.props.onListChange(listId, result);
                this.setState({selectValue: listId});
            }.bind(this)
        });
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-6">
                    <div className="input-group">
                        <span className="input-group-addon">
                            <label htmlFor="sel1">Select List</label>
                        </span>
                        <select className="form-control" id="sel1" onChange={this.onSelectChange} value={this.state.selectValue}>
                            {this.props.lists.map(function(list, i) {
                                return <option key={list.id} value={list.id}>{list.name}</option>
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
                        <input type="text" className="form-control" id="listName" placeholder="Enter name ..." onInput={this.onInput} value={this.state.inputListName}/>
                        <span className="input-group-btn">
                            <button className="btn btn-primary" onClick={this.onClickAddList}>+</button>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}
