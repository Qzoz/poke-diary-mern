import React, { Component } from "react";
import TwoHandleSlider from "./TwoHandleSlider";

class RangeSlider extends Component {
  constructor(props) {
    super(props);
    this.onLowChange = this.onLowChange.bind(this);
    this.onHighChange = this.onHighChange.bind(this);
    this.state = {
      low: 0,
      high: 255,
    };
  }

  onLowChange(val) {
    this.setState({ low: val });
    this.props.onChange && this.props.onChange(val, this.props.high);
  }
  onHighChange(val) {
    this.setState({ high: val });
    this.props.onChange && this.props.onChange(this.props.low, val);
  }

  render() {
    return (
      <TwoHandleSlider
        min={this.props.min || this.props.min === 0 ? this.props.min : 0}
        max={this.props.max ? this.props.max : 255}
        low={
          this.props.low || this.props.low === 0
            ? this.props.low
            : this.state.low
        }
        high={this.props.high ? this.props.high : this.state.high}
        onLowChange={this.onLowChange}
        onHighChange={this.onHighChange}
      />
    );
  }
}

export default RangeSlider;
