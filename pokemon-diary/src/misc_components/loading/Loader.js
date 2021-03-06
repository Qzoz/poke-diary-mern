import React, { Component } from "react";
import Loading from "./Loading";

class Loader extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.loadingIsStopped = this.loadingIsStopped.bind(this);
    this.state = {
      stopLoading: false,
    };
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate() {
    if (!this.props.isLoaded && this.props.isLoaded !== this.state.stopLoading) {
      this._isMounted && this.setState({
        stopLoading: this.props.isLoaded,
      });
    }
  }

  loadingIsStopped() {
    this._isMounted && this.setState({
      stopLoading: true,
    });
  }

  render() {
    if (this.state.stopLoading) return null;
    return (
      <Loading
        stopLoading={this.props.isLoaded}
        onLoadingStopped={this.loadingIsStopped}
        loadingText={this.props.loadingText}
      />
    );
  }
}

export default Loader;
