import React from "react";
import "./CountLabel.scss";

const CountLabel = (props) => {
  return (
    <div className="poke-count">
      <span className="poke-count-lbl">
        {props.label}
        <span className="poke-count-val">{props.value}</span>
      </span>
    </div>
  );
};

export default CountLabel;
