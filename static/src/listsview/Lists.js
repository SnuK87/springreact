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
                  selectedList: result[0]
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
            list: this.state.selectedList,
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

    handleListChange(listIndex) {
      this.setState({selectedList: this.state.lists[listIndex]}, function(){
        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "http://192.168.1.24:8080/list?id=" + this.state.selectedList.id,
            dataType: 'json',
            success: function(result) {
              console.log("Result: ");
              console.log(result);
              this.setState({
                items: result
              })
            }.bind(this)
        });
      });
    }

    handleAddList(selectedId, list) {
        this.setState({
          items: [],
          lists: this.state.lists.concat(list),
          selectedList: this.state.lists[this.state.lists.length - 1]
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
                <Header onListChange={this.handleListChange} lists={this.state.lists} onAddList={this.handleAddList}/>
                <hr/>
                <Table items={this.state.items} handleDelete={this.handleDelete}/>
                <hr/>
                <Bottom items={this.state.items} vocabs={this.state.vocabs} onAddItem={this.handleAddItem} />
            </div>
        );
    }
}
