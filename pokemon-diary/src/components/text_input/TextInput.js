import React, { Component } from "react";
import "./TextInput.scss";

class TextInput extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
    this.focusRef = React.createRef();
    this.state = {
      text: "",
      isFocused: false,
    };
  }

  componentWillUnmount() {
    this.focusRef.current.removeEventListener("focusin", this.onFocusChange);
    this.focusRef.current.removeEventListener("focusout", this.onFocusChange);
  }

  componentDidMount() {
    this.focusRef.current.addEventListener("focusin", this.onFocusChange);
    this.focusRef.current.addEventListener("focusout", this.onFocusChange);
  }

  onFocusChange() {
    this.setState((prevState) => {
      return {
        isFocused: !prevState.isFocused,
      };
    });
  }

  onChange(event) {
    if (this.props.type === "wholeNumber") {
      let val = event.target.value;
      if (
        (!isNaN(val) && !val.includes(".") && parseInt(val) >= 0) ||
        val === ""
      ) {
        if (val === "") val = 0;
        this.setState({ text: val });
        this.props.onChange && this.props.onChange(val);
      }
    } else {
      this.setState({ text: event.target.value });
      this.props.onChange && this.props.onChange(event.target.value);
    }
  }

  setText(val) {
    this.setState({text: val});
  }

  render() {
    let text = this.state.text;
    return (
      <div
        className={
          "input-container" + (this.state.isFocused ? " input-focused" : "")
        }
        ref={this.focusRef}
      >
        <input
          className={
            `text-input` +
            (this.props.className ? " " + this.props.className : "")
          }
          type="text"
          placeholder={this.props.hint}
          value={text}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default TextInput;
