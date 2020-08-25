import React, { Component } from "react";
import Image, { Shimmer } from "react-shimmer";
import FontAwesomeIcon from "../../FontAwesome";
import "./PokeCards.scss";
import { ModalConsumer } from "../../misc/ModalContext";
import pokeUrls from "../../misc/pokeUrls";
import { capitalizedName } from "../../misc/poke_misc";

class PokeCards extends Component {
  constructor(props) {
    super(props);
    this.pokeImgURL = pokeUrls.imgPokemonSmall(props.pokeId);
  }

  render() {
    let name = this.props.name;
    let enName = this.props.enName;
    if (!enName) enName = capitalizedName(name);
    const { extraDetails, showDetails, pokeId } = this.props;
    const nativeImgProp = {
      className: "poke-img",
    };
    return (
      <div className={"poke-card-cont" + (showDetails ? " has-details" : "")}>
        <div className="poke-card">
          <Image
            NativeImgProps={nativeImgProp}
            src={this.pokeImgURL}
            fallback={getShimmer()}
            errorFallback={() => getShimmer()}
          />
          <div className="poke-title">
            <p>
              {enName}&nbsp;
              <span className="poke-info">
                <ModalConsumer>
                  {({ onShowModal }) => {
                    return (
                      <FontAwesomeIcon
                        icon={["fas", "info-circle"]}
                        onClick={() => onShowModal(pokeId)}
                      />
                    );
                  }}
                </ModalConsumer>
              </span>
            </p>
          </div>
        </div>
        {showDetails ? (
          <div className="card-info">
            <div className="card-info-pad"></div>
            <div className="card-info-id poke-id">
              #<span>{pokeId}</span>
            </div>
            <div className="card-info-row">
              <p>Height</p>
              <p>{extraDetails.height ? extraDetails.height / 10 : "???"}</p>
            </div>
            <div className="card-info-row">
              <p>Weight</p>
              <p>{extraDetails.weight ? extraDetails.weight / 10 : "???"}</p>
            </div>
            {extraDetails.totalStat ? (
              <div className="card-info-row">
                <p>Total Stats</p>
                <p>{extraDetails.totalStat ? extraDetails.totalStat : "???"}</p>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
}

const getShimmer = () => (
  <Shimmer className="poke-img" width={250} height={250} />
);

export default PokeCards;
