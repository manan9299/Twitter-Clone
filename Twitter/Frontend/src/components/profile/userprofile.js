import React, { Component } from "react";
// import {Link} from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import '../../App.css';
import rootUrl from "../config/settings";
import {getProfile } from '../../actions';
import { connect } from 'react-redux';
import {updateProfile} from '../../actions';



const zipRegEx = /^[0-9]{5}(?:-[0-9]{4})?$/

const SignUpSchema = Yup.object().shape({
    userName: Yup.string()
        .required("userName is required"),
    Firstname: Yup.string()
        .required("name is required"),
    Lastname: Yup.string()
    .required("name is required"),
    email: Yup.string()
        .email("Invalid email address format")
        .required("Email is required"),
    password: Yup.string()
        .min(8, "Password must be 8 characters at minimum")
        .required("Password is required"),
    userAddress: Yup.string()
        .required("Address is required"),
    Description: Yup.string()
        .required("Description is required"),
    Zip: Yup.string()
    .matches(zipRegEx, "Zip code is not valid")
    .required("ZIP code is required")
   
})

var colors = {
    color: "balck"
}


class UserProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: "Sample",
            Firstname:'Sample name',
            Lastname:'Sample name',
            userEmail: "sample@abc.com",
            password: '********',
            userAddress:"12345",
            Description: "Add Description",
            Zip:"99999",
            profile_image: "",
            Created:"",
            profileImagePreview: undefined

          
        }
        this.editProfile = this.editProfile.bind(this)
        this.savechanges = this.savechanges.bind(this)
        this.handleChange = this.handleChange.bind(this);
    }


    componentDidMount() {
        console.log("Inside get profile after component did mount");
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        const data = {
            userEmail: localStorage.getItem('userEmail')
        }
        this.props.getProfile( data, response=>{
                console.log("inside success")
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log("response", response.data)
                    this.setState({
                        userEmail: response.data.email,
                        Firstname: response.data.first_Name,
                        Lastname: response.data.last_name,
                        userName: response.data.username,
                        password: response.data.password,
                        Zip: response.data.zip,
                        userAddress: response.data.city,
                        Description: response.data.description,
                        Created: response.data.created.slice(4,15),
                        profile_image: response.data.profile_image,

                    });
                    console.log("state updated", this.state)
                    // if (response.data.userImage) {
                    console.log("Profile image name", response.data.profile_image);
                    if (response.data.userImage) {
                        this.setState({
                            profileImagePreview: rootUrl + "/profile/download-file/" + response.data.profile_image
                        })
                    }
                    
                }
            })
            
    }

    //handle change of profile image
    handleChange = (e) => {
        const target = e.target;
        const name = target.name;

        if (name === "profile_image") {
            console.log(target.files);
            var profilePhoto = target.files[0];
            console.log("Profile.......................................",profilePhoto)

            var data = new FormData();
            data.append('photos', profilePhoto);
            
            axios.defaults.withCredentials = true;
            console.log("Profile image sending to backend",data,)
            axios.post(rootUrl + '/profile/upload-file', profilePhoto)
                .then(response => {
                    if (response.status === 200) {
                        console.log('Profile Photo Name: ', profilePhoto.name);
                        this.setState({
                            profile_image: profilePhoto.name,
                            profileImagePreview: rootUrl + "/profile/download-file/" + profilePhoto.name
                        })
                       
                    }
                });
        }
    }

    editProfile() {
        var frm = document.getElementById('profile-form');
        for (var i = 0; i < frm.length; i++) {
            frm.elements[i].disabled = false;
            // console.log(frm.elements[i])
        }
        // document.getElementById('userName').disabled = false;
        document.getElementById('userName').focus()
        document.getElementById('password').style.display = "block";
        // document.getElementById('btn-edit-profile').style.display="none";
        document.getElementById('btn-submit-profile').style.visibility = "visible";
        document.getElementById('btn-cancel-profile').style.visibility = "visible";
        document.getElementById('btn-edit').style.visibility = "hidden";
    }
 

    onsubmit = (details) => {
        console.log("Inside profile update", details);
        const data = {
            Password: details.password,
            userName: details.userName,
            Firstname: details.Firstname,
            Lastname: details.Lastname,
            Zip: details.Zip,
            userAddress: details.userAddress,
            Description: details.Description,
            userImage: this.state.profile_image,
            userEmail: localStorage.getItem('userEmail')
        }
        const data123=data.Firstname+data.Lastname+'('+data.userName+')'
        localStorage.setItem("userName", data123)
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        this.props.updateProfile( data, response=>{
                console.log("inside success")
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log("success", response)
                    // alert("success")
                    // console.log(response)
                }
            })
           
        this.savechanges()
    }

    savechanges() {
        var frm = document.getElementById('profile-form');
        for (var i = 0; i < frm.length; i++) {
            frm.elements[i].disabled = true;
        }
        // document.getElementById('userName').focus()
        document.getElementById('password').style.display = "none";
        // document.getElementById('btn-edit-profile').style.display="none";
        document.getElementById('btn-submit-profile').style.visibility = "hidden";
        document.getElementById('btn-cancel-profile').style.visibility = "hidden";
        document.getElementById('btn-edit').style.visibility = "visible";
    }


    render() {
        let redirectVar = null;
        // if (!cookie.load('cookie')) {
        //     redirectVar = <Redirect to="/login" />
        // }
        console.log("profile image preview", this.state.profileImagePreview)
        let profileImageData = <img src="https://img.freepik.com/free-icon/user-filled-person-shape_318-74922.jpg?size=338c&ext=jpg" alt="logo" />
        if (this.state.profileImagePreview) {
            profileImageData = <img src={this.state.profileImagePreview} alt="logo" />
        }
 
        return (
            <div className="row">   
                {redirectVar}
                <div className="col-md-7">
                    <span className="font-weight-bold">Your account</span>
                    {/* <button className="btn btn-link" id="btn-edit" onClick={this.edit}>Edit</button> */}
                    &nbsp;&nbsp;&nbsp;
                <a className="nav-link-inline" id="btn-edit" style={colors} href="#edit" onClick={this.editProfile}>Edit</a>
                    <Formik
                        enableReinitialize
                        initialValues={
                            {
                                email: this.state.userEmail,
                                userName: this.state.userName,
                                Firstname: this.state.Firstname,
                                Lastname: this.state.Lastname,
                                password: this.state.password,
                                userAddress: this.state.userAddress,
                                Description: this.state.Description,
                                Zip:this.state.Zip,
                                Created:this.state.Created
                            }}
                        validationSchema={SignUpSchema}
                        onSubmit={(values, actions) => {
                            this.onsubmit(values);
                            actions.setSubmitting(false);
                        }}
                    >
                        {({ touched, errors, isSubmitting }) => (
                            <Form id="profile-form">
                                <div className="form-group text-left col-sm-5">
                                    <br />
                                    <label htmlFor="userName">UserName</label>
                                    <Field
                                        type="text"
                                        name="userName"
                                        id="userName"
                                        //   onChange={this.userNameChangeHandler}
                                        //   value={this.state.userName}
                                        disabled
                                        //   autofocus="true"
                                        className={`form-control ${
                                            touched.userName && errors.userName ? "is-invalid" : ""
                                            }`}
                                    />
                                    <ErrorMessage
                                        component="div"
                                        name="userName"
                                        align="text-left"
                                        className="invalid-feedback"
                                    />
                                </div>
                                <div className="form-group text-left col-sm-5">
                                    <br />
                                    <label htmlFor="Firstname">Firstname</label>
                                    <Field
                                        type="text"
                                        name="Firstname"
                                        id="userName"
                                        //   onChange={this.userNameChangeHandler}
                                        //   value={this.state.userName}
                                        disabled
                                        //   autofocus="true"
                                        className={`form-control ${
                                            touched.Firstname && errors.Firstname ? "is-invalid" : ""
                                            }`}
                                    />
                                    <ErrorMessage
                                        component="div"
                                        name="Firstname"
                                        align="text-left"
                                        className="invalid-feedback"
                                    />
                                </div>

                                <div className="form-group text-left col-sm-5">
                                    <br />
                                    <label htmlFor="Lastname">Lastname</label>
                                    <Field
                                        type="text"
                                        name="Lastname"
                                        id="userName"
                                        //   onChange={this.userNameChangeHandler}
                                        //   value={this.state.userName}
                                        disabled
                                        //   autofocus="true"
                                        className={`form-control ${
                                            touched.Lastname && errors.Lastname ? "is-invalid" : ""
                                            }`}
                                    />
                                    <ErrorMessage
                                        component="div"
                                        name="Lastname"
                                        align="text-left"
                                        className="invalid-feedback"
                                    />
                                </div>

                                <div className="form-group text-left col-sm-5" id="password">
                                    <label htmlFor="password">Password</label>
                                    <Field
                                        type="password"
                                        name="password"
                                        // onChange={this.passwordChangeHandler}
                                        // value={this.state.password}
                                        disabled
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

                                <div className="form-group text-left col-sm-5">
                                    <label htmlFor="email">Email</label>
                                    <Field
                                        type="email"
                                        name="email"
                                        //   onChange={this.userEmailChangeHandler}
                                        //   value={this.state.userEmail}
                                        disabled
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

                                <div className="form-group text-left col-sm-5" id="userAddress">
                                    <label htmlFor="userAddress">City</label>
                                    <Field
                                        type="text"
                                        name="userAddress"
                                       
                                        disabled
                                        //   autofocus="true"
                                        className={`form-control ${
                                            touched.userAddress && errors.userAddress ? "is-invalid" : ""
                                            }`}
                                    />
                                    <ErrorMessage
                                        component="div"
                                        name="userAddress"
                                        align="text-left"
                                        className="invalid-feedback"
                                    />
                                </div>
                                <div className="form-group text-left col-sm-5">
                                    <label htmlFor="Description">Description</label>
                                    <Field
                                        type="text"
                                        name="Description"
                                     
                                        disabled
                                        //   autofocus="true"
                                        className={`form-control ${
                                            touched.Description && errors.Description ? "is-invalid" : ""
                                            }`}
                                    />
                                    <ErrorMessage
                                        component="div"
                                        name="Description"
                                        align="text-left"
                                        className="invalid-feedback"
                                    />
                                </div>

                                <div className="form-group text-left col-sm-5">
                                    <label htmlFor="Zip">Zip</label>
                                    <Field
                                        type="text"
                                        name="Zip"
                                        
                                        disabled
                                        //   autofocus="true"
                                        className={`form-control ${
                                            touched.Zip && errors.Zip ? "is-invalid" : ""
                                            }`}
                                    />
                                    <ErrorMessage
                                        component="div"
                                        name="Zip"
                                        align="text-left"
                                        className="invalid-feedback"
                                    />
                                </div>

                                <div className="form-group text-left col-sm-5">
                                    <label htmlFor="Created">Member Since</label>
                                    <Field
                                        type="text"
                                        name="Created"
                                        
                                        disabled
                                        //   autofocus="true"
                                        className={`form-control ${
                                            touched.Created && errors.Created ? "is-invalid" : ""
                                            }`}
                                    />
                                    <ErrorMessage
                                        component="div"
                                        name="Created"
                                        align="text-left"
                                        className="invalid-feedback"
                                    />
                                </div>

                                <br />
                                <div className="form-group">
                                    <label htmlFor="ProfileImage"><strong>Profile Image : </strong></label><br />
                                    <input type="file" name="ProfileImage" id="ProfileImage" className="btn btn-sm photo-upload-btn" onChange={this.handleChange} />
                                </div>
                                <div className="formholder">
                                    <span>
                                        <button className="btn btn-primary" type="submit" id="btn-submit-profile">Update Profile</button>
                                        &nbsp; <a href="/account" className="btn btn-outline-primary font-weight-bold" id="btn-cancel-profile" name="cancel">Cancel</a>
                                    </span>
                                </div>
                            </Form>

                        )}
                    </Formik>

                </div>
                <div className="col-md-5 center-content profile-heading">
                    {profileImageData}
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
      user: state.user
    };
  }
  
  export default connect( mapStateToProps , {getProfile: getProfile,updateProfile:updateProfile})(UserProfile);
  