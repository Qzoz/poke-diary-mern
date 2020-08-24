import React, { Component } from "react";
import "./ToggleButton.scss";

class ToggleButton extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOnn: props.isOnn ? true : false,
      onText: props.onText,
      offText: props.offText,
    };
  }

  toggle() {
    this.setState((prevState) => {
      return {
        isOnn: !prevState.isOnn,
      };
    });
  }

  render() {
    let stateClass = "";
    if (this.state.isOnn) stateClass = " onn";
    return (
      <p
        className={"text-toggle-button" + stateClass}
        onClick={() => {
          this.props.onToggle && this.props.onToggle(!this.state.isOnn);
          this.toggle();
        }}
      >
        {this.state.isOnn ? this.state.onText : this.state.offText}
      </p>
    );
  }
}

export default ToggleButton;
