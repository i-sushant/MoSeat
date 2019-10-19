import React, { Component } from 'react'
import classes from './Auth.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBus} from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
class Auth extends Component {
    constructor(props){
        super(props);
        this.inputChangedHandler = this.inputChangedHandler.bind(this)
        this.submitHandler = this.submitHandler.bind(this);
    }
    state={
        email:'',
        password:'',
        phoneNumber:null,
        firstName:'',
        lastName:'',
        isSignUp:false,
        authSuccess : false
    }
    authSwitch = () => {
        this.setState({
           isSignUp: !this.state.isSignUp,
           email:'',
           password:'',
           firstName:'',
           lastName:'',
           phoneNumber:''
        })
    }
    inputChangedHandler(event){
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    submitHandler(event){
        event.preventDefault();
        this.props.onAuth(this.state.email, this.state.password,this.state.phoneNumber,this.state.firstName,this.state.lastName,this.state.isSignUp)
    }
    render() {
        let form =  ( <form onSubmit={this.submitHandler}>
                        <div className={classes.input_container}>
                            <input placeholder="Email" name="email" onChange={this.inputChangedHandler}/>
                        </div>
                        <div className={classes.input_container}>
                            <input placeholder="Password" type="password" name="password" onChange={this.inputChangedHandler}/>
                        </div>
                        <div className={classes.submit_container}>
                            <span onClick={this.submitHandler}>Login</span>
                        </div> 
                    </form>
        );
        let welcomeMessage = "Welcome back";
        let joinUsMessage = (
            <h4 style={{'textAlign':'center','cursor':'pointer'}} onClick={this.authSwitch}>New Here? Join Us Now!</h4>
        );
        if (this.state.isSignUp) {
            form = (
                    <form onSubmit={this.submitHandler}>
                        <div className={classes.name_container}>
                            <div className={classes.name_field_container}>
                                <input placeholder="First Name" type="text" name="firstName" onChange={this.inputChangedHandler}/>
                            </div>
                            <div className={classes.name_field_container}>
                                 <input placeholder="Last Name" type="text" name="lastName" onChange={this.inputChangedHandler}/>
                            </div>
                        </div>
                        <div className={classes.input_container}>
                            <input placeholder="Email" type="email" name="email" onChange={this.inputChangedHandler}/>
                        </div>
                        <div className={classes.input_container}>
                             <input placeholder="Mobile Number" type="number" name="phoneNumber" onChange={this.inputChangedHandler}/>
                        </div>
                       <div className={classes.input_container}>
                            <input placeholder="Password" type="password" name="password" onChange={this.inputChangedHandler}/>
                       </div>
                        <div className={classes.submit_container}>
                            <span onClick={this.submitHandler} >Join Us</span>
                        </div>
                    </form>
            );
            welcomeMessage = "Sign up for amazing offers";
            joinUsMessage = (
                <div>
                    <h5 style={{'textAlign':'center'}}>By Signing up agree to our T&C</h5>
                    <h5 style={{'textAlign':'center','cursor':'pointer'}} onClick={this.authSwitch}>Already a Member? Sign in now!</h5>
                </div>
            );
        }
        
        return (
            <div>
                <div className={classes.form_container}>
                    <div className={classes.header}>
                        <FontAwesomeIcon icon={faBus} style={{'fontSize':'40px','marginTop':'1%'}}/>
                        <h3>MO<span>SEAT</span></h3>
                    </div>
                    <h4 style={{'fontFamily':'Roboto', 'textAlign':'center','fontSize':'25px','marginBottom':'5%'}}>{welcomeMessage}</h4>
                    {form}
                    {joinUsMessage}
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        isAuthenticated:state.auth.isAuthenticated,
        loading:state.auth.loading,
        error:state.auth.error
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, phoneNumber, firstName, lastName, isSignup) => dispatch(actions.auth(email, password, phoneNumber, firstName, lastName, isSignup))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
