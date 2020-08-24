import React, { Component, Fragment } from "react";
import axios from "axios";
import PokeCards from "../../poke_components/poke_cards/PokeCards";
import pokeUrls from "../../misc/pokeUrls";
import Sorter from "../../components/sort_component/Sorter";
import ToggleButton from "../../components/toggle_button/ToggleButton";
import CountLabel from "../../components/count_label/CountLabel";

class TypeNpage extends Component {
  constructor(props) {
    super(props);
    this.onSortChange = this.onSortChange.bind(this);
    this.typeUrl = pokeUrls.pokemon.getByType(this.props.typeName);
    this.state = {
      pokemonList: [],
      showDetails: false,
    };
  }

  componentDidMount() {
    axios
      .get(this.typeUrl)
      .then((result) => {
        this.setState({
          pokemonList: result.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onSortChange(sortBy, sortType) {
    try {
      let pokeList = this.state.pokemonList.slice(0);
      let sortParam = -1;
      if (sortBy.indexOf("stat-") === 0) {
        sortParam = Number(sortBy.split("-")[1]);
        sortBy = "statList";
      }
      if (sortParam === -1) {
        pokeList.sort((p1, p2) => {
          if (p1[sortBy] < p2[sortBy]) {
            return sortType === 1 ? -1 : 1;
          } else if (p1[sortBy] > p2[sortBy]) {
            return sortType === 1 ? 1 : -1;
          } else {
            if (p1.id <= p2.id) {
              return -1;
            } else {
              return 1;
            }
          }
        });
      } else {
        pokeList.sort((p1, p2) => {
          if (p1[sortBy][sortParam].baseStat < p2[sortBy][sortParam].baseStat) {
            return sortType === 1 ? -1 : 1;
          } else if (
            p1[sortBy][sortParam].baseStat > p2[sortBy][sortParam].baseStat
          ) {
            return sortType === 1 ? 1 : -1;
          } else {
            if (p1.id <= p2.id) {
              return -1;
            } else {
              return 1;
            }
          }
        });
      }
      this.setState({ pokemonList: pokeList });
    } catch (err) {
      console.log("Sorting Error Occured");
    }
  }

  render() {
    const pokeList = this.state.pokemonList;
    return (
      <Fragment>
        <CountLabel label="Pokemon Count" value={pokeList.length}/>
        <div className="card-options-row">
          <Sorter
            selected="id"
            sortMap={{
              id: "#ID",
              name: "Name",
              height: "Height",
              weight: "Weight",
              "stat-0": "HP",
              "stat-1": "Attack",
              "stat-2": "Defence",
              "stat-5": "Speed",
              "stat-3": "Spc. Att.",
              "stat-4": "Spc. Def",
            }}
            onSortChange={this.onSortChange}
          />
          <div className="card-info-toggle">
            <span>Details </span>
            <ToggleButton
              isOnn={this.state.showDetails}
              onText="Show"
              offText="Hide"
              onToggle={(val) => {
                this.setState({ showDetails: val });
              }}
            />
          </div>
        </div>
        <div className="type-poke-card-holder">
          {pokeList.length
            ? pokeList.map((value) => {
                let enName = value.species.enName;
                if (
                  value.pokeForms[0] &&
                  value.pokeForms[0].name !== value.pokeForms[0].enName
                )
                  enName = value.pokeForms[0].enName;
                let totalStat = 0;
                value.statList.forEach((stat) => (totalStat += stat.baseStat));
                return (
                  <PokeCards
                    key={`key${value.id}`}
                    pokeId={value.id}
                    name={value.name}
                    enName={enName}
                    showDetails={this.state.showDetails}
                    extraDetails={{
                      height: value.height,
                      weight: value.weight,
                      totalStat: totalStat,
                    }}
                  />
                );
              })
            : null}
        </div>
      </Fragment>
    );
  }
}

export default TypeNpage;
