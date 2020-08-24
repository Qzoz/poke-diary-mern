import React, { Component } from "react";
import RangeSlider from "../../components/two_handle_slider/RangeSlider";
import TextInput from "../../components/text_input/TextInput";

class SliderBlocks extends Component {
  constructor(props) {
    super(props);
    this.getValues = this.getValues.bind(this);
    this.lowRef = React.createRef();
    this.highRef = React.createRef();
    this.min = props.min ? props.min : 0;
    this.max = props.max ? props.max : 255;
    this.state = {
      low: props.low ? props.low : 0,
      high: props.high ? props.high : 255,
    };
  }

  componentDidMount() {
    this.initChildTextInput();
  }

  getStepDiff() {
    return Math.ceil(((this.max - this.min) * 2) / 100);
  }

  getValues() {
    return [this.state.low, this.state.high];
  }

  reset() {
    this.initChildTextInput();
    return this.setState({ low: this.min, high: this.max });
  }

  initChildTextInput() {
    if (this.lowRef && this.lowRef.current) {
      this.lowRef.current.setText(this.min);
    }
    if (this.highRef && this.highRef.current) {
      this.highRef.current.setText(this.max);
    }
  }

  render() {
    return (
      <div className="slider-block-cont">
        <RangeSlider
          min={this.min}
          max={this.max}
          low={this.state.low}
          high={this.state.high}
          onChange={(low, high) => {
            this.setState({ low: low, high: high });
            if (this.lowRef && this.lowRef.current) {
              this.lowRef.current.setText(low);
            }
            if (this.highRef && this.highRef.current) {
              this.highRef.current.setText(high);
            }
            this.props.onChange && this.props.onChange([low, high]);
          }}
        />
        <div className="slider-block">
          <div className="slider-block-child">
            <TextInput
              className="slider-block-field"
              ref={this.lowRef}
              type="wholeNumber"
              onChange={(val) => {
                if (!isNaN(val)) val = parseInt(val);
                else val = 0;
                if (
                  val >= this.min &&
                  this.state.high - val >= this.getStepDiff()
                )
                  this.setState({ low: val });
              }}
            />
          </div>
          <p className="slider-block-child slider-block-name">
            {this.props.tag}
          </p>
          <div className="slider-block-child">
            <TextInput
              className="slider-block-field"
              ref={this.highRef}
              type="wholeNumber"
              onChange={(val) => {
                if (!isNaN(val)) val = parseInt(val);
                else val = 0;
                if (
                  val <= this.max &&
                  val - this.state.low >= this.getStepDiff()
                )
                  this.setState({ high: val });
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SliderBlocks;
