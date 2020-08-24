import React, { Component } from "react";
import TypeCards from "../../poke_components/type_cards/TypeCards";
import PokeDetailHOC from "./PokeDetailHOC";

class PokeDetailType extends Component {
  render() {
    const typeList = this.props.types ? this.props.types : [];
    return (
      <PokeDetailHOC
        childClassName="poke-detail-type-holder"
        isRight={this.props.isRight}
        heading="Pokemon Type/s"
      >
        {typeList.length
          ? typeList.map((value) => {
              return (
                <TypeCards
                  key={`key-${value.type.name}`}
                  struct={{ name: value.type.enName }}
                  isDemo={this.props.isDemo ? this.props.isDemo : true}
                />
              );
            })
          : null}
      </PokeDetailHOC>
    );
  }
}

export default PokeDetailType;
