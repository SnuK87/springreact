import React from 'react';
import Test from './Test';
import $ from 'jquery';

export default class Stuff extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lists: [],
            selectValue: '',
            learnMode: false
        };

        this.onSelectChange = this.onSelectChange.bind(this)
        this.initLearn = this.initLearn.bind(this)

    }

    componentWillMount() {
        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "http://192.168.1.24:8080/lists",
            dataType: 'json',
            success: function(result) {
                this.setState({lists: result, selectValue: result[0].name});
            }.bind(this)
        });
    }

    initLearn() {
        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "http://192.168.1.24:8080/list?name=" + this.state.selectValue,
            dataType: 'json',
            success: function(result) {
                this.setState({items: result, learnMode: true});
            }.bind(this)
        });
    }

    onSelectChange(event) {
        this.setState({selectValue: event.target.value});
    }

    render() {
        return (
            <div>
                <h2>Learn</h2>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="input-group">
                            <span className="input-group-addon">
                                <label htmlFor="sel1">Select:</label>
                            </span>
                            <select className="form-control" id="sel1" onChange={this.onSelectChange} value={this.state.selectValue} disabled={this.state.learnMode}>
                                {this.state.lists.map(function(list, i) {
                                    return <option key={list.id}>{list.name}</option>
                                })}
                            </select>
                            <span className="input-group-btn">
                                <button type="submit" className="btn btn-primary" onClick={this.initLearn} disabled={this.state.learnMode}>Start</button>
                            </span>
                        </div>
                    </div>
                </div>
                {this.state.learnMode
                    ? <Test vocabs={this.state.items}/>
                    : null}

            </div>
        );
    }
}
