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
            selectedOption: 0,
            vocabs: [],
        };

        this.handleAddItem = this.handleAddItem.bind(this)
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

                this.setState({
                  lists: result,
                });

                $.ajax({
                    type: "GET",
                    contentType: "application/json",
                    url: "http://192.168.1.24:8080/list?id=" + this.state.lists[0].id,
                    dataType: 'json',
                    success: function(result) {
                        this.setState({items: result});
                    }.bind(this),
                });

            }.bind(this),
        });

        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "http://192.168.1.24:8080/getVocabularies",
            dataType: 'json',
            success: function(result) {
                this.setState({vocabs: result});
            }.bind(this),
        });
    }

    handleAddItem(vocab) {
        var items_tmp = this.state.items;

        //check if already in list
        for (var i = 0; i < items_tmp.length; i++) {
            if (items_tmp[i].vocabulary.id === vocab.id) {
                return;
            }
        }

        //persist
        var dataToSend = {
            id: null,
            list: this.state.lists[this.state.selectedOption],
            vocabulary: vocab,
        };

        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://192.168.1.24:8080/saveItem",
            data: JSON.stringify(dataToSend),
            dataType: 'json',
            success: function(result) {
                this.setState({
                    items: items_tmp.concat(result)
                });
            }.bind(this),
        });
    }

    handleListChange(selectedIndex) {
      this.setState({selectedOption: selectedIndex}, function(){
        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "http://192.168.1.24:8080/list?id=" + this.state.lists[selectedIndex].id,
            dataType: 'json',
            success: function(result) {
              this.setState({
                items: result
              })
            }.bind(this)
        });
      });
    }

    handleAddList(listName) {
      $.ajax({
            type: "POST", contentType: "application/json", url: "http://192.168.1.24:8080/saveList",
            data: listName,
            dataType: 'json',
            success: function(result) {
              this.setState({
                items: [],
                lists: this.state.lists.concat(result),
                selectedOption: this.state.lists.length
              });
            }.bind(this)
        });
    }

    handleDelete(rowId) {
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://192.168.1.24:8080/deleteItem",
            data: JSON.stringify(this.state.items[rowId]),
            dataType: 'text/plain',
            success: function(result) {
              console.log("Result: " + result);
            },
        });

        var copyItems = this.state.items;
        copyItems.splice(rowId, 1);
        this.setState({items: copyItems});
    }

    render() {
        return (
            <div>
                <h2>Lists</h2>
                <Header onListChange={this.handleListChange} lists={this.state.lists} onAddList={this.handleAddList} selectedValue={this.state.selectedOption}/>
                <hr/>
                <Table items={this.state.items} handleDelete={this.handleDelete}/>
                <hr/>
                <Bottom items={this.state.items} vocabs={this.state.vocabs} onAddItem={this.handleAddItem} />
            </div>
        );
    }
}
