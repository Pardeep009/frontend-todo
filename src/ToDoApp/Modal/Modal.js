import React, { Component } from 'react';

import './Modal.css';
import Backdrop from '../Backdrop/Backdrop';
// import Aux from '../../../hoc/Aux/Aux';

class Modal extends Component {

    shouldComponentUpdate(nextProps,nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render() {
        console.log('runs');
        return (
            <>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div
                className="Modal"
                style={{
                    transform : this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity : this.props.show ? '1' : '0'
                }}>
                    {this.props.children}
                </div>
            </>
        );

    }
};

export default Modal;