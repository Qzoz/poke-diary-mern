import React from "react";
import SearchSetHOC from "./SearchSetHOC";
import AbilityCards from "../../poke_components/ability_cards/AbilityCards";

const AbilitySet = (props) => {
  const { abilityList } = props;
  if (!abilityList || !abilityList.length) return null;
  return (
    <SearchSetHOC heading={`Abilities | ${abilityList.length}`} wrap>
      {abilityList.map((ability) => {
        return (
          <AbilityCards
            key={`key-${ability.id}`}
            verticalCenter
            ability={ability}
          />
        );
      })}
    </SearchSetHOC>
  );
};

export default AbilitySet;
