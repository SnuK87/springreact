import React from 'react';

const divStyle = {
    margin: '50px 0px 50px 0px'
};

export default class Table extends React.Component {
    constructor(props) {
        super(props);

        this.onClickDeleteItem = this.onClickDeleteItem.bind(this)
    }

    onClickDeleteItem(event) {
        //var copyItems = this.props.items;
        //copyItems.splice(event.target.id, 1);
        this.props.handleDelete(event.target.id);
    }


    render(){
      return(
        <table className="table table-striped" style={divStyle}>
            <thead>
                <tr>
                    <th>English</th>
                    <th>Korean</th>
                    <th>Pronounciation</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {this.props.items.map(function(item, i) {
                    return <tr key={item.id}>
                        <td>{item.vocabulary.english}</td>
                        <td>{item.vocabulary.korean}</td>
                        <td>{item.vocabulary.pronounciation}</td>
                        <td>
                            <button type="button" className="btn btn-danger" id={i} onClick={this.onClickDeleteItem}>-</button>
                        </td>
                    </tr>
                }.bind(this))}
            </tbody>
        </table>
      );
    }
  }
