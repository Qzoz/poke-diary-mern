import React from "react";
import "./RatioBar.scss";

const RatioBar = (props) => {
  let ratio1 = props.r1;
  let ratio2 = props.r2;
  if (ratio1 === 0) ratio2 = 1;
  if (ratio2 === 0) ratio1 = 1;
  return (
    <div className="poke-ratio-bar-cont">
      {!props.fallbackValue ? (
        <div className="poke-ratio-bar">
          {ratio1 ? (
            <div
              className="ratio-child-1"
              style={{
                flex: ratio1,
              }}
            >
              {props.children && props.children.length && props.children[0]}
            </div>
          ) : null}
          {ratio2 ? (
            <div
              className="ratio-child-2"
              style={{
                flex: ratio2,
              }}
            >
              {props.children && props.children.length && props.children[1]}
            </div>
          ) : null}
        </div>
      ) : (
        <p>{props.fallbackValue}</p>
      )}
      <p className="label">{props.heading}</p>
    </div>
  );
};

export default RatioBar;
