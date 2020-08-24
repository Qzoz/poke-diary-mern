import React, { Component } from "react";
import EvolutionCards from "../../poke_components/evolution_cards/EvolutionCards";
import PokeDetailHOC from "./PokeDetailHOC";

class PokeDetailEvolution extends Component {
  render() {
    return (
      <PokeDetailHOC
        childClassName="poke-detail-evolution-holder"
        isRight={this.props.isRight}
        heading="Evolution Chain"
      >
        <EvolutionCards
          evoUrl={this.props.evoUrl}
          pokeName={this.props.pokeName}
        />
      </PokeDetailHOC>
    );
  }
}

export default PokeDetailEvolution;
