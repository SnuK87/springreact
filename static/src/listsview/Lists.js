import React from 'react';
// import Autosuggest from 'react-autosuggest';
import $ from 'jquery';
import Bottom from './Bottom';
import Header from './Header';
import Table from './Table';

export default class Contact extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lists: [],
            items: [],
            inputListName: '',
            inputVocab: '',
            //TODO noch wird id gespeichert, es soll aber das ganze list object gespeichert werden
            selectedList: '',
            vocabs: []
        };

        this.handleBottomInput = this.handleBottomInput.bind(this)
        this.handleListChange = this.handleListChange.bind(this)
        this.handleAddList = this.handleAddList.bind(this)
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentWillMount() {
        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "http://192.168.1.24:8080/lists",
            dataType: 'json',
            success: function(result) {

                this.setState({lists: result, selectedList: result[0].id});

                $.ajax({
                    type: "GET",
                    contentType: "application/json",
                    url: "http://192.168.1.24:8080/list?id=" + this.state.lists[0].id,
                    dataType: 'json',
                    success: function(result) {
                        this.setState({items: result});
                    }.bind(this)
                });

            }.bind(this)
        });

        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "http://192.168.1.24:8080/getVocabularies",
            dataType: 'json',
            success: function(result) {
                this.setState({vocabs: result});
            }.bind(this)
        });

    }

    handleBottomInput(vocab) {
        this.setState({items: this.state.items.concat(vocab)});
    }

    handleListChange(selectedId, newItems) {
        this.setState({selectedList: selectedId, items: newItems})
    }

    handleAddList(selectedId, list) {
        this.setState({items: [], lists: this.state.lists.concat(list), selectedList: selectedId});
    }

    handleDelete(newItems) {
        this.setState({items: newItems});
    }

    render() {
        return (
            <div>
                <h2>Header</h2>
                <Header onListChange={this.handleListChange} lists={this.state.lists} onAddList={this.handleAddList}/>
                <hr/>
                <Table items={this.state.items} handleDelete={this.handleDelete}/>
                <hr/>
                <Bottom items={this.state.items} vocabs={this.state.vocabs} onAddItem={this.handleBottomInput} listId={this.state.selectedList}/>
            </div>
        );
    }
}
