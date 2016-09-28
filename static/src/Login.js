import React from 'react';

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: ''
        };

        this.onInput = this.onInput.bind(this)
    }

    onInput(event) {
        this.setState({
            email: event.target.value
        });
    }

    onSubmit(event) {
        alert("onSubmit");
    }

    render() {
        return ( <
            div >
            <
            h2 > Login < /h2> <
            form className = "form-horizontal" >
            <
            div className = "form-group" >
            <
            label className = "control-label col-sm-2"
            htmlFor = "email" > Email: < /label> <
            div className = "col-sm-10" >
            <
            input type = "email"
            name = "email"
            className = "form-control"
            id = "email"
            placeholder = "Enter email"
            onChange = {
                this.onInput
            }
            value = {
                this.state.email
            }
            /> <
            /div> <
            /div> <
            div className = "form-group" >
            <
            label className = "control-label col-sm-2"
            htmlFor = "pwd" > Password: < /label> <
            div className = "col-sm-10" >
            <
            input type = "password"
            className = "form-control"
            id = "pwd"
            placeholder = "Enter password" / >
            <
            /div> <
            /div> <
            div className = "form-group" >
            <
            div className = "col-sm-offset-2 col-sm-10" >
            <
            button type = "submit"
            disabled = {!this.state.email
            }
            className = "btn btn-default"
            onClick = {
                this.onSubmit
            } > Submit < /button> <
            /div> <
            /div> <
            /form> <
            /div>
        );
    }
}
