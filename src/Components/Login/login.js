import React, { Component } from 'react';
import './loginStyle.css';

const axios = require('axios').default;

export default class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
        localStorage.removeItem("tokenLogin")
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onEmailChange = (event) => {
        this.setState({ email: event.target.value })
    }

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let ErrorText = document.querySelector(".Error_handling")
        const reactData = {
            email: this.state.email,
            password: this.state.password,
        }
        // window.location.href = "/banner";

        if (reactData.email === "" || reactData.password === "") {
            this.setState({
                email: '',
                password: '',
            })
            ErrorText.innerText = "Fill out correctly!!!!!"
        }
        else {
            // axios.get("/t/2peag-1621525579/post")
            axios.post("http://localhost:3001/login", reactData)
                .then(function (response) {
                    console.log(response);
                    localStorage.setItem("tokenLogin", "true")
                    localStorage.setItem("UserID", response.data.id)
                    window.location.href = "/banner";
                })
                .catch(function (error) {
                    console.log(error.response.data);
                    // localStorage.setItem("tokenLogin", null)

                    if (error.response.status === 401) {
                        ErrorText.innerText = "Wrong Password!!!!!"
                    }
                    else if (error.response.status === 404) {
                        ErrorText.innerText = "User not Found, Sign up first!!!!"
                    }
                })
        }
    }

    componentDidMount() {
        const inputs = document.querySelectorAll(".login_input_field");

        function addcl() {
            let parent = this.parentNode.parentNode;
            parent.classList.add("focus");
        }

        function remcl() {
            let parent = this.parentNode.parentNode;
            if (this.value === "") {
                parent.classList.remove("focus");
            }
        }

        inputs.forEach(input => {
            input.addEventListener("focus", addcl);
            input.addEventListener("blur", remcl);
        });

    }

    render() {
        return (
            <div className="login">
                <div className="Navbar_to_home">
                    <a href="/">
                        HOME
                    </a>
                </div>
                <img className="wave" src="img/wave.png" alt="" />
                <div className="login_container">
                    <div className="login_img">
                        <img src="img/bg.svg" alt="" />
                    </div>
                    <div className="login-content">
                        <form action="/banner" className="login_form" method="post">
                            <img src="img/avatar.svg" alt="" />

                            <h2 className="login_title">Welcome Back</h2>

                            <div className="login_inputs one">
                                <div className="login_icon">
                                    <i className="fas fa-user"></i>
                                </div>
                                <div className="div">
                                    <h5 className="login_subtitle">Email</h5>
                                    <input type="mail" className="login_input_field"
                                        value={this.state.email} onChange={this.onEmailChange}
                                        required />
                                </div>
                            </div>

                            <div className="login_inputs pass">
                                <div className="login_icon">
                                    <i className="fas fa-lock"></i>
                                </div>
                                <div className="div">
                                    <h5 className="login_subtitle">Password</h5>
                                    <input type="password" className="login_input_field"
                                        value={this.state.password} onChange={this.onPasswordChange}
                                        required />
                                </div>
                            </div>
                            <div className="Error_handling">

                            </div>
                            {/* <a href="/" className="forgot_pass">Forgot Password?</a> */}
                            <a href="/banner" className="Submit_link">
                                <input type="submit" className="submit_btn_login" value="Login"
                                    onClick={this.handleSubmit} />
                            </a>

                            <h3 className="sign_up_page_text">Don't have an account?</h3>
                            <a href="/register" className="sign_up_page_link">Click Here To Sign Up</a>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}