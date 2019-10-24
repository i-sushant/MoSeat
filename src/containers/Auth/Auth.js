import React, { Component } from 'react'
import classes from './Auth.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBus} from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal'
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
        this.props.authStart();
        setTimeout(this.setState({
        isSignUp: !this.state.isSignUp,
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: ''
        }) ,3000)
    }
    inputChangedHandler(event){
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    submitHandler(event){
        event.preventDefault();
        this.props.onAuth(this.state.email, this.state.password,this.state.phoneNumber,this.state.firstName,this.state.lastName,this.state.isSignUp)
        this.setState({
            email: '',
            password: '',
            phoneNumber: null,
            firstName: '',
            lastName: '',
            isSignUp: false,
            authSuccess: false
        });
    }
    render() {
        let form =  ( <form onSubmit={this.submitHandler}>
                        <div className={classes.input_container}>
                            <input placeholder="Email" name="email"  className={classes.effect_1} onChange={this.inputChangedHandler}/>
                            <span className={classes.focus_border} />
                        </div>
                        <div className={classes.input_container}>
                            <input placeholder="Password" type="password" className={classes.effect_1} name="password" onChange={this.inputChangedHandler}/>
                            <span className={classes.focus_border} />
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
        if (this.state.isSignUp && !this.props.loading) {
            form = (
                    <form onSubmit={this.submitHandler}>
                        <div className={classes.name_container}>
                            <div className={classes.name_field_container}>
                                <input placeholder="First Name" type="text" className={classes.effect_1} name="firstName" onChange={this.inputChangedHandler}/>
                                <span className={classes.focus_border} />
                            </div>
                            <div className={classes.name_field_container}>
                                 <input placeholder="Last Name" type="text" className={classes.effect_1} name="lastName" onChange={this.inputChangedHandler}/>
                                 <span className={classes.focus_border} />
                            </div>
                        </div>
                        <div className={classes.input_container}>
                            <input placeholder="Email" type="email" name="email" className={classes.effect_1} onChange={this.inputChangedHandler}/>
                            <span className={classes.focus_border} />
                        </div>
                        <div className={classes.input_container}>
                             <input placeholder="Mobile Number" type="number" className={classes.effect_1} name="phoneNumber" onChange={this.inputChangedHandler}/>
                             <span className={classes.focus_border} />
                        </div>
                       <div className={classes.input_container}>
                            <input placeholder="Password" type="password" name="password" className={classes.effect_1} onChange={this.inputChangedHandler}/>
                            <span className={classes.focus_border} />
                       </div>
                        <div className={classes.submit_container}>
                            <span onClick={this.submitHandler}>Join Us</span>
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

        let authForm =  (
            <div className={classes.form_container}>
                    <div className={classes.header}>
                        <FontAwesomeIcon icon={faBus} style={{'fontSize':'40px','marginTop':'1%'}}/>
                        <h3>MO<span>SEAT</span></h3>
                    </div>
                    <h4 style={{'fontFamily':'Roboto', 'textAlign':'center','fontSize':'25px','marginBottom':'5%'}}>{welcomeMessage}</h4>
                    {form}
                    {joinUsMessage}
            </div>
         )
        if(this.props.loading){
            authForm = <Spinner />  
            setTimeout(this.props.authReady,1000); 
        }
        if(this.props.error){
            authForm = (
                <Modal show={this.props.error !== ''} modalClosed={this.authCancelHandler}>
                    <h4>{this.props.error}</h4>
                </Modal>
            )
        }
        return (
            <div>
                {authForm}
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
        onAuth: (email, password, phoneNumber, firstName, lastName, isSignup) => dispatch(actions.auth(email, password, phoneNumber, firstName, lastName, isSignup)),
        authReady:() => dispatch(actions.authReady())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
