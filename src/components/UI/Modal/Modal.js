import React,{Component} from 'react';
import classes from './Modal.module.css';
import Aux from '../../../hoc/Auxiliary'
import Backdrop from '../Backdrop/Backdrop';
import Transition from 'react-transition-group/Transition'
const animationTiming = {
    enter: 400,
    exit:1000
}
class Modal extends Component {
    shouldComponentUpdate(nextProps,nextState){
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }
    render(){
        
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <Transition mountOnEnter unmountOnExit in={this.props.show} timeout={animationTiming}>
                    {state => {
                        const cssClasses = [classes.Modal, state ==='entering' ? classes.openModal : state === 'exiting' ? classes.closeModal : null];
                        return (
                            <div className={cssClasses.join(' ')}>
                                {this.props.children}
                            </div>
                        );
                    }}
                    
                </Transition>
                
            </Aux>
        )
    }
}
export default Modal;