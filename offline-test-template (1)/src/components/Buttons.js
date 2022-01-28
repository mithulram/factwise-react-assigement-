import React from "react";

class Button extends React.Component {

  render() {
    return (
      <>
        <button onClick={() => this.props.dispatch({ type: 'increment' })}>+</button>
        <p> {this.props.parentState} </p>
        <button onClick={() => this.props.dispatch({ type: 'decrement' })}>-</button>
      </>
    );
  }
}


export default Button;