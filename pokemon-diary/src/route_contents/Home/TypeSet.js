import React from "react";
import SearchSetHOC from "./SearchSetHOC";
import TypeCards from "../../poke_components/type_cards/TypeCards";

const TypeSet = (props) => {
  const { typeList } = props;
  if (!typeList || !typeList.length) return null;
  return (
    <SearchSetHOC heading={`Types | ${typeList.length}`}>
      {typeList.map((type) => {
        return (
          <TypeCards
            key={`key-${type.id}`}
            struct={{
              name: type.enName,
            }}
          />
        );
      })}
    </SearchSetHOC>
  );
};

export default TypeSet;
