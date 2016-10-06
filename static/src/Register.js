import React from 'react';

export default class Register extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            username: '',
            pwd: '',
            status: false
        };

        this.onInput = this.onInput.bind(this)
    }

    onInput(event) {
        switch (event.target.id) {
            case "username":
                this.setState({
                    username: event.target.value
                });
                break;
            case "email":
                this.setState({
                    email: event.target.value
                });
                break;
            case "pwd":
                this.setState({
                    pwd: event.target.value
                });
                break;
        }

        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


        if (username.value.length > 3 && pwd.value.length > 6 && re.test(email.value)) {
            this.setState({
                status: true
            });
        } else {
            this.setState({
                status: false
            });
        }
    }

    handleSubmit(event){
        event.preventDefault();
        $.ajax({
          type: "POST",
          contentType: "application/json",
          url: "http://localhost:8080/register",
          data: JSON.stringify("TEST"),
          dataType: 'json',
          success: function(result){
                  alert(result);
                 }
          });
    }

    render() {
        return ( <
            div >
            <h2> Sign Up </h2>
            <form className = "form-horizontal" onSubmit={this.handleSubmit}>
            <
            div className = "form-group" >
            <
            label className = "control-label col-sm-2"
            htmlFor = "username" > Username: < /label> <
            div className = "col-sm-10" >
            <input type = "text"
                   name = "username"
                   className = "form-control"
                   id = "username"
                   placeholder = "Enter username"
                   value = {this.state.username}
                   onChange = {this.onInput}
            />
            </div>
            </div> <
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
            value = {
                this.state.email
            }
            onChange = {
                this.onInput
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
            placeholder = "Enter password"
            value = {
                this.state.pwd
            }
            onChange = {
                this.onInput
            }
            /> <
            /div> <
            /div> <
            div className = "form-group" >
            <
            div className = "col-sm-offset-2 col-sm-10" >
            <
            button type = "submit"
            className = "btn btn-default"
            disabled = {!this.state.status
            } > Submit < /button> <
            /div> <
            /div> <
            /form> <
            /div>
        );
    }
}
