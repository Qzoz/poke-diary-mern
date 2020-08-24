import React, { Fragment } from "react";
import Tooltip from "../../components/tooltip/Tooltip";
import FontAwesomeIcon from "../../FontAwesome";
import "./AbilityCards.scss";

const AbilityCards = (props) => {
  const { isHidden, ability, verticalCenter } = props;
  return (
    <div className="ability-card-cont">
      <div className="ability-card">
        <div className="card-head">
          <p>{ability.enName}</p>
        </div>
        <div className="card-body">
          {ability.enEffect ? (
            <Tooltip center vert={verticalCenter} className="info-button">
              <FontAwesomeIcon
                className="effect-ability"
                icon={["far", "question-circle"]}
                size="2x"
              />
              {ability.enEffect ? (
                <DescBlock
                  shortDesc={
                    ability.enEffect ? ability.enEffect.shortEffect : null
                  }
                  shortDescHead={ability.enEffect ? "Short Effect" : null}
                  desc={ability.enEffect ? ability.enEffect.effect : null}
                  descHead={ability.enEffect ? "Effect" : null}
                />
              ) : null}
            </Tooltip>
          ) : null}
          <p>{ability.generation ? ability.generation.enName : "???"}</p>
        </div>
      </div>
      {isHidden ? (
        <div className="hidden-tag">
          <p>Hidden</p>
        </div>
      ) : null}
    </div>
  );
};

const DescBlock = (props) => {
  return (
    <div className="ability-effect-block">
      {props.shortDesc ? (
        <Fragment>
          <h4>{props.shortDescHead}</h4>
          <p>{props.shortDesc}</p>
          <hr className="hr-divide" />
        </Fragment>
      ) : null}
      {props.descHead ? <h4>{props.descHead}</h4> : null}
      <p>{props.desc}</p>
    </div>
  );
};

export default AbilityCards;
