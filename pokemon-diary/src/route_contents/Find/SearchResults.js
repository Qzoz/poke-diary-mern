import React, { Component, Fragment } from "react";
import axios from "axios";
import CountLabel from "../../components/count_label/CountLabel";
import Loader from "../../misc_components/loading/Loader";
import OnError from "../../misc_components/error/OnError";
import pokeUrls from "../../misc/pokeUrls";
import PokeCards from "../../poke_components/poke_cards/PokeCards";
import ToggleButton from "../../components/toggle_button/ToggleButton";

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.searchForParams = this.searchForParams.bind(this);
    this._isMounted = false;
    this.state = {
      isLoaded: false,
      hasError: false,
      errorMsg: "",
      result: [],
      noAnyQuery: true,
      isSearched: false,
      showDetails: false,
    };
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
  }

  fetchSearchData(searchParam) {
    axios
      .post(pokeUrls.pokemon.query(), { data: searchParam })
      .then((result) => {
        this._isMounted &&
          this.setState({
            isLoaded: true,
            hasError: false,
            result: result.data,
          });
      })
      .catch((err) => {
        this._isMounted &&
          this.setState({
            isLoaded: true,
            hasError: true,
            errorMsg: err.message,
          });
      });
  }

  searchForParams(searchParam) {
    if (searchParam.id !== "" && searchParam.id !== 0) {
      searchParam.id = parseInt(searchParam.id);
    } else {
      searchParam.id = 0;
    }
    if (searchParam.name && searchParam.name === "") {
      searchParam.name = null;
    }
    searchParam.type1 = parseInt(searchParam.type1);
    searchParam.type2 = parseInt(searchParam.type2);
    if (!this.isQueryAllowed(searchParam)) {
      this._isMounted && this.setState({ isSearched: true, noAnyQuery: true });
    } else {
      this._isMounted && this.setState({
        isSearched: true,
        noAnyQuery: false,
        isLoaded: false,
        hasError: false,
      });
      this.fetchSearchData({
        id: searchParam.id,
        name: searchParam.name,
        type1: searchParam.type1,
        type2: searchParam.type2,
        ability: searchParam.ability,
        height: searchParam.height,
        weight: searchParam.weight,
        hp: searchParam.hp,
        at: searchParam.attack,
        df: searchParam.defense,
        sa: searchParam.spAttack,
        sd: searchParam.spDefense,
        sp: searchParam.speed,
      });
    }
  }

  isQueryAllowed(searchParam) {
    if (searchParam.id || searchParam.name) {
      return true;
    } else {
      if (searchParam.type1 !== 0 || searchParam.type2 !== 0) return true;
      if (searchParam.ability !== 0) return true;
      if (
        searchParam.height[0] !== searchParam.range.height[0] ||
        searchParam.height[1] !== searchParam.range.height[1]
      )
        return true;
      if (
        searchParam.weight[0] !== searchParam.range.weight[0] ||
        searchParam.weight[1] !== searchParam.range.weight[1]
      )
        return true;
      if (
        searchParam.hp[0] !== searchParam.range.stats[0] ||
        searchParam.hp[1] !== searchParam.range.stats[1]
      )
        return true;
      if (
        searchParam.attack[0] !== searchParam.range.stats[0] ||
        searchParam.attack[1] !== searchParam.range.stats[1]
      )
        return true;
      if (
        searchParam.defense[0] !== searchParam.range.stats[0] ||
        searchParam.defense[1] !== searchParam.range.stats[1]
      )
        return true;
      if (
        searchParam.spAttack[0] !== searchParam.range.stats[0] ||
        searchParam.spAttack[1] !== searchParam.range.stats[1]
      )
        return true;
      if (
        searchParam.spDefense[0] !== searchParam.range.stats[0] ||
        searchParam.spDefense[1] !== searchParam.range.stats[1]
      )
        return true;
      if (
        searchParam.speed[0] !== searchParam.range.stats[0] ||
        searchParam.speed[1] !== searchParam.range.stats[1]
      )
        return true;
    }
    return false;
  }

  render() {
    if (!this.state.isSearched) return null;
    if (this.state.noAnyQuery)
      return (
        <div className="no-query-message">
          <p>No Option Selected or Entered</p>
        </div>
      );
    return (
      <div className="poke-find-result-cont">
        <Loader isLoaded={this.state.isLoaded} loadingText="Finding" />
        {this.state.isLoaded && !this.state.hasError && (
          <Fragment>
            {this.state.result.length ? (
              <Fragment>
                <CountLabel
                  label="Pokemon Found"
                  value={this.state.result.length}
                />
                <div className="card-info-toggle">
                  <span>Details </span>
                  <ToggleButton
                    isOnn={this.state.showDetails}
                    onText="Show"
                    offText="Hide"
                    onToggle={(val) => {
                      this._isMounted && this.setState({ showDetails: val });
                    }}
                  />
                </div>
                <div className="poke-find-result">
                  {this.state.result.map((pokemon) => {
                    let enName = pokemon.species.enName;
                    if (
                      pokemon.pokeForms &&
                      pokemon.pokeForms[0] &&
                      pokemon.pokeForms[0].name !== pokemon.pokeForms[0].enName
                    )
                      enName = pokemon.pokeForms[0].enName;
                    return (
                      <PokeCards
                        key={pokemon.id}
                        pokeId={pokemon.id}
                        enName={enName}
                        name={pokemon.name}
                        showDetails={this.state.showDetails}
                        extraDetails={{
                          height: pokemon.height,
                          weight: pokemon.weight,
                        }}
                      />
                    );
                  })}
                </div>
              </Fragment>
            ) : (
              <div className="no-query-message">
                <p>No Match Found</p>
              </div>
            )}
          </Fragment>
        )}
        {this.state.isLoaded && this.state.hasError && (
          <OnError
            showError={this.state.hasError}
            errorMsg={this.state.errorMsg}
          />
        )}
      </div>
    );
  }
}

export default SearchResults;
