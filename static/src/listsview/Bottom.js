import React from 'react';
import $ from 'jquery';

export default class Bottom extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            inputVocab: ''
        };

        this.onClickAddItemToList = this.onClickAddItemToList.bind(this)
        this.onInputVocab = this.onInputVocab.bind(this)
        this.onKeyPressVocab = this.onKeyPressVocab.bind(this)
    }

    onInputVocab(event) {
        this.setState({inputVocab: event.target.value});
    }

    onKeyPressVocab(event) {
        if (event.key === 'Enter') {
            this.onClickAddItemToList();
        }
    }

    onClickAddItemToList(event) {
        var vocabs = this.props.vocabs;

        for (var i = 0; i < vocabs.length; i++) {
            if (vocabs[i].english === this.state.inputVocab) {
                this.setState({inputVocab: ''});
                this.props.onAddItem(vocabs[i]);
                break;
            } else {
                //TODO Vokabel nicht gefunden
            }
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-6">
                    <div className="input-group">
                        <span className="input-group-addon">
                            <label htmlFor="usr">Add Vocabulary</label>
                        </span>
                        <input type="text" className="form-control" id="usr" placeholder="Vocabulary" onInput={this.onInputVocab} value={this.state.inputVocab} onKeyPress={this.onKeyPressVocab}/>
                        <span className="input-group-btn">
                            <button type="submit" className="btn btn-primary" onClick={this.onClickAddItemToList}>+</button>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}
