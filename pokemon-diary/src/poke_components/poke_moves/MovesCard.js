import React, { Component, Fragment } from "react";
import FontAwesomeIcon from "../../FontAwesome";
import Tooltip from "../../components/tooltip/Tooltip";

class MovesCard extends Component {
  constructor(props) {
    super(props);
    this.statMap = {
      HP: "Hp.",
      Attack: "At.",
      Defense: "Df.",
      "Special Attack": "SA.",
      "Special Defense": "SD.",
      Speed: "Sp.",
      accuracy: "Ac.",
      evasion: "Ev.",
    };
    this.statRevMap = {
      "Hp.": "HP",
      "At.": "Attack",
      "Df.": "Defense",
      "SA.": "Special Attack",
      "SD.": "Special Defense",
      "Sp.": "Speed",
      "Ac.": "Accuracy",
      "Ev.": "Evasion",
    };
  }

  render() {
    const {
      id,
      enName,
      power,
      accuracy,
      pp,
      effectChance,
      type,
      damageClass,
      generation,
      category,
      hits,
      statChanges,
      enEffect,
    } = this.props.move;
    let initialStatVal = null;
    if (statChanges) {
      initialStatVal = {};
      initialStatVal[this.statMap["HP"]] = null;
      initialStatVal[this.statMap["Attack"]] = null;
      initialStatVal[this.statMap["Defense"]] = null;
      initialStatVal[this.statMap["Special Attack"]] = null;
      initialStatVal[this.statMap["Special Defense"]] = null;
      initialStatVal[this.statMap["Speed"]] = null;
      initialStatVal[this.statMap["accuracy"]] = null;
      initialStatVal[this.statMap["evasion"]] = null;
      for (let i = 0; i < statChanges.length; i++) {
        if (this.statMap[statChanges[i].stat.enName])
          initialStatVal[this.statMap[statChanges[i].stat.enName]] =
            statChanges[i].by;
      }
      initialStatVal = Object.entries(initialStatVal);
    }
    return (
      <div className="move-card-cont">
        <div className="move-card-index">
          <div className="index-padding"></div>
          {this.props.index}
        </div>
        <div className="move-card">
          <div className="card-head">
            <div className="move-id-name-chip">
              <p>{id}</p>
              <p>{enName}</p>
            </div>
            <RatingAndRow tag="Acc" percent={accuracy} />
            <RatingAndRow tag="Ech" percent={effectChance} />
            <RatingAndRow tag="Power" value={power} />
            <RatingAndRow tag="Power Point" value={pp} />
            <div className={`move-type-chip type-${type.enName.toLowerCase()}`}>
              <p className="chip-name">{type.enName}</p>
            </div>
            {hits ? (
              <div className="move-hits-range">
                <span>{hits.min}</span>
                <FontAwesomeIcon
                  className="symb"
                  icon={["fas", "less-than-equal"]}
                />
                <span>Hits</span>
                <FontAwesomeIcon
                  className="symb"
                  icon={["fas", "less-than-equal"]}
                />
                <span>{hits.min}</span>
              </div>
            ) : null}
          </div>
          <div className="card-body">
            {initialStatVal ? (
              <div className="move-stat-effect-board">
                {initialStatVal.map((setVal) => {
                  return (
                    <div className="stat-brd-1" key={`key-${setVal[0]}`}>
                      <Tooltip>
                        <p>{setVal[0]}</p>
                        <DescBlock
                          descHead={null}
                          desc={this.statRevMap[setVal[0]]}
                        />
                      </Tooltip>
                      <p>
                        {setVal[1] ? (
                          setVal[1]
                        ) : (
                          <FontAwesomeIcon
                            className="no-val"
                            icon={["fas", "minus"]}
                          />
                        )}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : null}
            <RatingAndRow tag="Generation" value={generation.enName} />
            <RatingAndRow tag="Damage Class" value={damageClass.enName} />
            <Tooltip>
              <RatingAndRow
                tag="Category"
                value={category ? category.name : null}
              />
              <DescBlock
                descHead="Description"
                desc={category ? category.enDescription : null}
              />
            </Tooltip>
            <Tooltip>
              <p className="move-effect-button">Effects</p>
              <DescBlock
                descHead="Effect"
                desc={enEffect.effect.replace("$effect_chance", effectChance)}
                shortDescHead="Short Effect"
                shortDesc={enEffect.shortEffect.replace(
                  "$effect_chance",
                  effectChance
                )}
              />
            </Tooltip>
          </div>
        </div>
      </div>
    );
  }
}

const DescBlock = (props) => {
  return (
    <div className="move-effect-block">
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

const RatingAndRow = (props) => {
  return (
    <div className="card-rating-row">
      <p>{props.tag}.</p>
      {props.percent ? (
        <div className="perc-rating">
          <div
            className="perc-rating-fill"
            style={{
              width: `${props.percent}%`,
            }}
          ></div>
        </div>
      ) : (
        <div className="only-value">{props.value ? props.value : "???"}</div>
      )}
    </div>
  );
};

export default MovesCard;
