import React from "react";

const SearchSetHOC = (props) => {
  return (
    <div className="search-general-container">
      <h2>{props.heading}</h2>
      <div
        className={
          "flex-horizontal-container" + (props.wrap ? " wrap" : " no-wrap")
          + (props.fcol ? " fcol": "")
        }
      >
        {props.children}
      </div>
    </div>
  );
};

export default SearchSetHOC;
