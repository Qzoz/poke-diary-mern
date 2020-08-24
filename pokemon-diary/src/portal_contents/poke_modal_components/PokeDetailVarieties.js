import React, { Component } from "react";
import { capitalizedNameDash } from "../../misc/poke_misc";
import Image, { Shimmer } from "react-shimmer";
import pokeUrls from "../../misc/pokeUrls";
import PokeDetailHOC from "./PokeDetailHOC";

class PokeDetailVarieties extends Component {
  render() {
    const basePokeId = this.props.pokeId;
    const varieties = this.props.varieties;
    if (basePokeId === 0) return null;
    return (
      <PokeDetailHOC
        heading="Varieties"s
        isRight={this.props.isRight}
        childClassName="poke-detail-varieties-holder"
      >
        {varieties.length
          ? varieties.map(({ pokemon }, index) => {
              let pokeImgUrl = "";
              let enName = "";
              if (
                pokemon.pokeForms &&
                pokemon.pokeForms[0] &&
                pokemon.pokeForms[0].enName
              ) {
                if (index > 0) enName = pokemon.pokeForms[0].enName;
                else enName = pokemon.species.enName;
              } else {
                enName = capitalizedNameDash(pokemon.name);
              }
              pokeImgUrl = pokeUrls.imgPokemon(pokemon.id);
              return (
                <PokeDetailVarietiesCard
                  key={`key-${pokemon.id}`}
                  pokeImgUrl={pokeImgUrl}
                  pokeName={enName}
                />
              );
            })
          : null}
      </PokeDetailHOC>
    );
  }
}

const PokeDetailVarietiesCard = (props) => {
  return (
    <div className="poke-variety-card">
      <div className="poke-variety-image-cont">
        <Image
          NativeImgProps={{ className: "poke-variety-image" }}
          src={props.pokeImgUrl ? props.pokeImgUrl : ""}
          fallback={getShimmer()}
          errorFallback={() => getShimmer()}
        />
      </div>
      <p>{props.pokeName}</p>
    </div>
  );
};

const getShimmer = () => <Shimmer width={500} height={500} />;

export default PokeDetailVarieties;
