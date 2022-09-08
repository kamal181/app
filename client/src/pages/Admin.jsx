// ⛏️⛏️ ALL OPERATIONS OF ADMIN ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
import React, { Component } from 'react';
import { hostname } from '../utils/global';
import Login from '../components/admin/Login';
import Loader from "../components/elements/Loader";
import '../style/Admin.css';
import withNavigate from '../HOC/withNavigate';
import { Navigate } from 'react-router-dom';





class Admin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            loginEmail: "",
            loginPassword: "",
            errors: [],
            success: "",
        };


        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }


    // ⛏️⛏️ VALUE IS COMING FROM CHILD COMPONENT 
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }


    // ⛏️⛏️ LOGIN 
    async handleLogin(e) {
        e.preventDefault();
        try {
            this.setState({ isLoading: true });
            // console.log(this.state);
            const response = await fetch(`${hostname}/api/admin/login`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: this.state.loginEmail,
                    password: this.state.loginPassword
                })
            });
            this.setState({ isLoading: false });

            if (response.status === 200) {
                const textRes = await response.text();
                const jsonRes = await JSON.parse(textRes);
                // console.log("Json - ", jsonRes);
                if (jsonRes.user) {
                    this.setState({
                        errors: [],
                        success: "Login successfull"
                    });
                    this.props.authValidation(true);
                    localStorage.setItem("user", JSON.stringify(jsonRes.user));
                    // REDIRECT FROM  HERE TO DASHBOARD
                    this.props.navigateToTarget('/admin/dashboard');
                }

                // console.log("Login success - ", response);

                // this.setState({
                //     errors: [],
                //     success: "Login successfull"
                // });

            }

            if (response.status === 400 || response.status === 401) {
                this.setState({
                    errors: [...this.state.errors, { msg: "Your email or password is invalid" }],
                    success: "",
                });
                this.props.authValidation(false);

            }
        } catch (error) {
            console.log(error);
        }
    }








    render() {
        if (localStorage.getItem('user')) {
            return <Navigate to="/admin/dashboard" />;
        } else {
            return (
                <div className="Admin">
                    <div className="container">
                        {this.state.isLoading ? <Loader /> : (<React.Fragment>
                            <Login
                                success={this.state.success}
                                handleChange={this.handleChange}
                                errors={this.state.errors}
                                handleLogin={this.handleLogin}
                            />
                        </React.Fragment>
                        )}
                    </div>
                    {/* {this.checkErrors()} */}
                </div>
            );
        }
    }
}


export default withNavigate(Admin);