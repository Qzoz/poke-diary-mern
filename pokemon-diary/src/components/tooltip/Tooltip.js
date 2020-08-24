import React from "react";
import "./Tooltip.scss";

const Tooltip = (props) => {
  let tooltipClasses = "tooltip";
  if (props.center) tooltipClasses += " center";
  if (props.vert) tooltipClasses += " vert";
  if (props.className) tooltipClasses += " " + props.className;
  return (
    <div className={tooltipClasses}>
      {props.children[0]}
      <div className="tooltip-content">{props.children[1]}</div>
    </div>
  );
};

export default Tooltip;
