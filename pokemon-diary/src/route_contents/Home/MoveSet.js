import React from "react";
import SearchSetHOC from "./SearchSetHOC";
import PokeMoves from "../../poke_components/poke_moves/PokeMoves";

const MoveSet = (props) => {
  const { moveList } = props;
  if (!moveList || !moveList.length) return null;
  return (
    <SearchSetHOC heading={`Moves | ${moveList.length}`} fcol>
      <PokeMoves moveList={moveList} />
    </SearchSetHOC>
  );
};

export default MoveSet;
