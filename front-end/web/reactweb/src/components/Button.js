import React, { Component } from 'react';

class Button extends Component {
    render() {
        return (
            <div>
                <button onClick={this.props.onDecrement}>Prev</button>
                <button onClick={this.props.onIncrement}>Next</button>
            </div>
        );
    }
}
export default Button;