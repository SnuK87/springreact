import React from 'react';

export default class TestResult extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        var rows = [];
        var correctCount = 0;

        for (var i = 0; i < this.props.vocabs.length; i++) {
            rows.push(
                <tr key={i}>
                    <td>{this.props.vocabs[i].vocabulary.korean}</td>
                    <td>{this.props.vocabs[i].vocabulary.english}</td>
                    <td>{this.props.inputs[i]}</td>
                    <td>{this.props.vocabs[i].vocabulary.english === this.props.inputs[i] ? <span style={{color: 'green'}} className="glyphicon glyphicon-ok"></span> : <span style={{color: 'red'}} className="glyphicon glyphicon-remove"></span>}</td>
                </tr>
            );

            if (this.props.vocabs[i].vocabulary.english === this.props.inputs[i]) {
                correctCount = correctCount + 1;
            }
        }

        var n = this.props.vocabs.length;
        var x = ((correctCount / n) * 100).toFixed(0);

        return (
            <div>
                <h1>{x} % correct</h1>
                  <div className="progress">
                      <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{
                          width: x + '%'
                      }}>
                          {x}%
                      </div>
                  </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Korean</th>
                            <th>English</th>
                            <th>Input</th>
                            <th>Correct</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
                <button className="btn btn-primary">Continue</button>
            </div>
        );
    }
}
