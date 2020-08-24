import React, { Component } from "react";
import PokeDetailHOC from "./PokeDetailHOC";
import AbilityCards from "../../poke_components/ability_cards/AbilityCards";

class PokeDetailAbilities extends Component {
  render() {
    const { abilities } = this.props;
    return (
      <PokeDetailHOC
        heading="Ability"
        isRight={this.props.isRight}
        childClassName="poke-detail-abilities-holder"
      >
        {abilities.length
          ? abilities.map(({ isHidden, ability }) => {
              return (
                <AbilityCards
                  key={`key-${ability.id}`}
                  isHidden={isHidden}
                  ability={ability}
                />
              );
            })
          : null}
      </PokeDetailHOC>
    );
  }
}

export default PokeDetailAbilities;
