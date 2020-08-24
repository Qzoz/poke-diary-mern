import React, { Component } from "react";
import PokeDetailHOC from "./PokeDetailHOC";
import PokeMoves from "../../poke_components/poke_moves/PokeMoves";
import pokeUrls from "../../misc/pokeUrls";

class PokeDetailMoves extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMoves: false,
    };
  }

  render() {
    return (
      <PokeDetailHOC heading="Move List" isRight={this.props.isRight}>
        {this.state.showMoves ? (
          <PokeMoves
            moveUrl={pokeUrls.pokemon.getMovesById(this.props.pokeId)}
          />
        ) : (
          <div className="load-moves-button-holder">
            <button
              className="load-moves-button"
              onClick={() => {
                this.setState({ showMoves: true });
              }}
            >
              Load Move List
            </button>
          </div>
        )}
      </PokeDetailHOC>
    );
  }
}

export default PokeDetailMoves;
