import React, { Component } from "react";
import FontAwesomeIcon from "../../FontAwesome";
import "./DropDown.scss";
import InvisibleScroll from "../../misc_components/invisible_scroll/InvisibleScroll";

class DropDown extends Component {
  constructor(props) {
    super(props);
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.onOptionChange = this.onOptionChange.bind(this);
    this.state = {
      isOpened: false,
      selected: props.selected,
    };
  }
  toggleDropDown() {
    this.setState((prevState) => {
      return {
        isOpened: !prevState.isOpened,
      };
    });
  }
  onOptionChange(optionSelected) {
    this.setState({ selected: optionSelected });
    this.props.onOptionChange && this.props.onOptionChange(optionSelected);
  }
  render() {
    let openedCLass = "";
    if (this.state.isOpened) openedCLass = " opened";
    const { dropDownMap } = this.props;
    let { selected } = this.state;
    if (this.props.parentSelect)
      selected = this.props.selected;
    return (
      <div
        className={
          `dropdown-container${openedCLass}` +
          (this.props.className ? " " + this.props.className : "")
        }
        onClick={this.toggleDropDown}
      >
        <p className="value">{dropDownMap[selected]}</p>
        <FontAwesomeIcon icon={["fas", "caret-down"]} />
        <InvisibleScroll className="dropdown-content">
          {Object.entries(dropDownMap).map((value) => {
            return (
              <div
                key={`key-${value[0]}`}
                className={
                  "dropdown-content-item" +
                  (value[0] === selected ? " selected" : "")
                }
                onClick={() => this.onOptionChange(value[0])}
              >
                <p>{value[1]}</p>
              </div>
            );
          })}
        </InvisibleScroll>
      </div>
    );
  }
}

export default DropDown;
