import React, { Component } from 'react';
// TOdo. 1. make this code available to APp.js 2. refactor into FSC
class Button extends Component {
    render() {
        const { onClick, className = '', children,
        } = this.props;
        return (<button
            onClick={onClick}
            className={className}
            type="button"
        >{children}
        </button>);
    }
}
export default Button;