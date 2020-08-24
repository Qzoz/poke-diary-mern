import React, { Component } from "react";
import "./TwoHandleSlider.scss";

class TwoHandleSlider extends Component {
  constructor(props) {
    super(props);
    this.thumbConstant = 1;
    this.onHandleDragEnd = this.onHandleDragEnd.bind(this);
    this.onHandleDrag = this.onHandleDrag.bind(this);
    this.lowHandleRef = React.createRef();
    this.highHandleRef = React.createRef();
    this.parentHandleRef = React.createRef();
    this.state = {
      min: props.min,
      max: props.max,
    };
  }

  componentWillUnmount() {
    if (this.lowHandleRef && this.lowHandleRef.current) {
      this.lowHandleRef.current.removeEventListener("drag", (e) =>
        this.onHandleDrag("low", e)
      );
      this.lowHandleRef.current.removeEventListener("dragend", (e) =>
        this.onHandleDragEnd("low", e)
      );
      this.lowHandleRef.current.removeEventListener("touchmove", (e) =>
        this.onHandleDrag("low", e)
      );
      this.lowHandleRef.current.removeEventListener("touchend", (e) =>
        this.onHandleDragEnd("low", e)
      );
    }
    if (this.highHandleRef && this.highHandleRef.current) {
      this.highHandleRef.current.removeEventListener("drag", (e) =>
        this.onHandleDrag("high", e)
      );
      this.highHandleRef.current.removeEventListener("dragend", (e) =>
        this.onHandleDragEnd("high", e)
      );
      this.highHandleRef.current.removeEventListener("touchmove", (e) =>
        this.onHandleDrag("high", e)
      );
      this.highHandleRef.current.removeEventListener("touchend", (e) =>
        this.onHandleDragEnd("high", e)
      );
    }
  }

  componentDidMount() {
    if (this.lowHandleRef && this.lowHandleRef.current) {
      this.lowHandleRef.current.addEventListener("drag", (e) =>
        this.onHandleDrag("low", e)
      );
      this.lowHandleRef.current.addEventListener("dragend", (e) =>
        this.onHandleDragEnd("low", e)
      );
      this.lowHandleRef.current.addEventListener("touchmove", (e) =>
        this.onHandleDrag("low", e)
      );
      this.lowHandleRef.current.addEventListener("touchend", (e) =>
        this.onHandleDragEnd("low", e)
      );
    }
    if (this.highHandleRef && this.highHandleRef.current) {
      this.highHandleRef.current.addEventListener("drag", (e) =>
        this.onHandleDrag("high", e)
      );
      this.highHandleRef.current.addEventListener("dragend", (e) =>
        this.onHandleDragEnd("high", e)
      );
      this.highHandleRef.current.addEventListener("touchmove", (e) =>
        this.onHandleDrag("high", e)
      );
      this.highHandleRef.current.addEventListener("touchend", (e) =>
        this.onHandleDragEnd("high", e)
      );
    }
  }

  getMinMaxDiff() {
    return this.state.max - this.state.min;
  }

  getStepDiff() {
    return Math.ceil((this.state.max - this.state.min) * 2 / 100);
  }

  getParentRange() {
    if (this.parentHandleRef && this.parentHandleRef.current) {
      return {
        min: this.parentHandleRef.current.offsetLeft,
        max:
          this.parentHandleRef.current.offsetLeft +
          this.parentHandleRef.current.offsetWidth,
      };
    }
    return {
      min: 0,
      max: 0,
    };
  }

  handleDrag(target, currX) {
    const parentLimit = this.getParentRange();
    let parentDiff = parentLimit.max - parentLimit.min;
    let lowHandleLimit = parentLimit.min + this.lowHandleRef.current.offsetLeft;
    let highHandleLimit =
      parentLimit.min + this.highHandleRef.current.offsetLeft;
    if (target === "high") {
      if (currX > lowHandleLimit && currX <= parentLimit.max) {
        let finalHighLoc =
          this.state.max -
          Math.round(
            ((parentLimit.max - currX) / parentDiff) * this.getMinMaxDiff()
          );
        if (finalHighLoc - this.props.low < this.getStepDiff())
          finalHighLoc = Math.ceil(this.props.low + this.getStepDiff());
        this.props.onHighChange(finalHighLoc);
      }
    }
    if (target === "low") {
      if (currX >= parentLimit.min && currX < highHandleLimit) {
        let finalLowLoc =
          this.state.min +
          Math.round(
            ((currX - parentLimit.min) / parentDiff) * this.getMinMaxDiff()
          );
        if (this.props.high - finalLowLoc < this.getStepDiff())
          finalLowLoc = Math.floor(this.props.high - this.getStepDiff());
        this.props.onLowChange(finalLowLoc);
      }
    }
  }

  onHandleDrag(target, event) {
    if (event.type === "touchmove") {
      this.handleDrag(target, event.touches[0].clientX);
    } else {
      this.handleDrag(target, event.clientX);
    }
  }

  onHandleDragEnd(target, event) {
    if (event.type === "touchmove") {
      this.handleDrag(target, event.touches[0].clientX);
    } else {
      this.handleDrag(target, event.clientX);
    }
  }

  getLowHighDimen() {
    return {
      low: Math.floor((this.props.low * 100) / this.getMinMaxDiff()),
      high: Math.ceil((this.props.high * 100) / this.getMinMaxDiff()),
    };
  }

  render() {
    const lowHigh = this.getLowHighDimen();
    return (
      <div className="slider-container">
        <div className="slider-parent" ref={this.parentHandleRef}>
          <div className="slider-track"></div>
          <div
            className="slider-thumb low"
            style={{
              left: `${lowHigh.low}%`,
            }}
            draggable={true}
            ref={this.lowHandleRef}
          ></div>
          <div
            className="slider-thumb high"
            style={{
              left: `calc(${lowHigh.high}% - 0.25rem)`,
            }}
            draggable={true}
            ref={this.highHandleRef}
          ></div>
          <div
            className="slider-range"
            style={{
              left: `${lowHigh.low}%`,
              width: `calc(${lowHigh.high - lowHigh.low}%)`,
            }}
          ></div>
        </div>
      </div>
    );
  }
}

export default TwoHandleSlider;
