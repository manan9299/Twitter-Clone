import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import logo from '../../images/login-page.jpg'
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { loginuser } from '../../actions'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email address format")
        .required("Email is required"),
    password: Yup.string()
        .required("Password is required")
});

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            authFlag: 'false'
        };

        // this.submitLogin = this.submitLogin.bind(this);
    }
    componentDidMount () {
        this.setState({
          authFlag: false,
          authFailed: false
        })
    }

    onsubmit = (formValues) => {
        console.log('OnSubmit' + formValues)
        let data = {
            userEmail: formValues.email,
            userPassword: formValues.password
        }
        axios.defaults.withCredentials = true
        this.props.loginuser(data, res => {
          if (res.status === 200) {
            console.log('Inside response',res.data);
            this.setState({
              authFlag:true
            })
            const data123=res.data.Firstname+res.data.Lastname+'('+res.data.userName+')'
            localStorage.setItem("userName", data123)
            localStorage.setItem("userEmail", res.data.userEmail)
            localStorage.setItem("jwt", res.data.Token)

          } else {
            alert('Please enter valid credentials')
          }
        })
      }

    render() {
        // console.log("test cookie",cookie.load('username-localhost-8888'))
        let redirectVar = null;
        
        if (localStorage.getItem("jwt") != null) {
            console.log('user logged in')
            redirectVar = <Redirect to="/userhome" />
        }
        
        return (
            <div className="container-fluid">
                {redirectVar}
                <div className="row align-items-center h-100 ">
                    <div className="col-md-6-fluid">
                        <img src={logo} alt="" className="img-responsive fit-image" />
                    </div>
                    <div className="col-md-4 mx-auto">
                        <div className="card shadow p-3 mb-5 rounded">
                            <div className="card-body text-left" >
                                <h4 className="text-black text-left font-weight-bold">See what’s happening in the world right now</h4>
                                <h6><br></br><b>Join Twitter today.</b></h6>
                                <br />
                                
                                <Formik
                                    initialValues={this.state}
                                    validationSchema={LoginSchema}
                                    onSubmit={(values, actions) => {
                                        this.onsubmit(values)
                                        actions.setSubmitting(false);
                                    }}
                                >
                            
                                    {({ touched, errors, isSubmitting }) => (
                                        <Form>
                                            <div className="form-group text-left">
                                                <label htmlFor="email">Email</label>
                                                <Field
                                                    type="email"
                                                    name="email"
                                                    // autofocus="true"
                                                    className={`form-control ${
                                                        touched.email && errors.email ? "is-invalid" : ""
                                                        }`}
                                                />
                                                <ErrorMessage
                                                    component="div"
                                                    name="email"
                                                    align="text-left"
                                                    className="invalid-feedback"
                                                />
                                            </div>

                                            <div className="form-group text-left">
                                                <label htmlFor="password">Password</label>
                                                <Field
                                                    type="password"
                                                    name="password"
                                                    className={`form-control ${
                                                        touched.password && errors.password ? "is-invalid" : ""
                                                        }`}
                                                />
                                                <ErrorMessage
                                                    component="div"
                                                    name="password"
                                                    className="invalid-feedback"
                                                />
                                            </div>
                                            <br />
                                            <button
                                                type="submit"
                                                // id="signin"
                                                className="btn btn-primary btn-block text-white font-weight-bold"
                                            >
                                                Sign in
                                                </button>
                                        </Form>
                                    )}
                                </Formik>
                                <br />
                                Need an Account!&nbsp;&nbsp;<Link to="/signup">Signup</Link>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


const validate = formValues => {
    const error = {}
    if (!formValues.email) {
      error.email = 'Enter a valid email'
    }
    if (!formValues.password) {
      error.password = 'Enter a valid Password'
    }
    return error
  }
  
  const mapStateToProps = state => {
    return { user: state.user }
  }
  
  export default connect(
    mapStateToProps,
    { loginuser }
  )(
    reduxForm({
      form: 'streamLogin',
      validate: validate
    })(LoginForm)
  )