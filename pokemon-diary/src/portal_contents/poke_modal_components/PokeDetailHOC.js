import React from "react";
import "./PokeDetails.scss";

const PokeDetailHOC = (props) => {
  const settled = props.isRight ? "right" : "left";
  return (
    <div className="poke-detail-cont">
      <h2 className={`${settled}-settled`}>{props.heading}</h2>
      <div className={`${props.childClassName}`}>{props.children}</div>
    </div>
  );
};

export default PokeDetailHOC;
