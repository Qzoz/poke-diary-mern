import React, { Component, Fragment } from "react";
import RouteInfo from "../components/RouteInfo";
import "./RouteFind.scss";
import FindPage from "./FindPage";

class RouteFind extends Component {
  render() {
    return (
      <Fragment>
        <RouteInfo fullPath={this.props.match.url} />
        <FindPage />
      </Fragment>
    );
  }
}

export default RouteFind;
