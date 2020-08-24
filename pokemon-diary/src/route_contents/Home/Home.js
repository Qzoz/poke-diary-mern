import React, { Component, Fragment } from "react";
import "./Home.scss";
import FontAwesomeIcon from "../../FontAwesome";
import axios from "axios";
import pokeUrls from "../../misc/pokeUrls";
import TypeSet from "./TypeSet";
import PokemonSet from "./PokemonSet";
import AbilitySet from "./AbilitySet";
import MoveSet from "./MoveSet";

class Home extends Component {
  constructor(props) {
    super(props);
    this.onSearchTextChange = this.onSearchTextChange.bind(this);
    this.onEnterPress = this.onEnterPress.bind(this);
    this.onSearchClicked = this.onSearchClicked.bind(this);
    this._isMounted = false;
    this.state = {
      isLoaded: true,
      hasError: false,
      errorMsg: null,
      showTextLenErr: false,
      searchedText: "",
      typeList: null,
      pokemonList: null,
      abilityList: null,
      moveList: null,
    };
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
  }

  fetchSearchData(dataString) {
    axios
      .get(pokeUrls.search(dataString))
      .then((result) => {
        if (result.data.error) {
          this._isMounted &&
            this.setState({
              hasError: true,
              errorMsg: result.data.error,
            });
          return;
        }
        result = result.data.result;
        this._isMounted &&
          this.setState({
            isLoaded: true,
            hasError: false,
            typeList: result.types,
            pokemonList: result.pokemons,
            abilityList: result.abilities,
            moveList: result.moves,
          });
      })
      .catch((err) => {
        this._isMounted &&
          this.setState({
            hasError: true,
            errorMsg: err.message,
            isLoaded: true,
          });
      });
  }

  onSearchTextChange(event) {
    this.setState({ searchedText: event.target.value });
  }

  onEnterPress(event) {
    if (event.key === "Enter") {
      this.onSearchClicked();
    }
  }

  onSearchClicked() {
    if (this.state.searchedText.length >= 2 && this.state.isLoaded) {
      this.setState({ isLoaded: false });
      this.fetchSearchData(this.state.searchedText);
    } else {
      this.setState({ showTextLenErr: true });
      setTimeout(() => {
        this.setState({ showTextLenErr: false });
      }, 3000);
    }
  }

  render() {
    const { typeList, abilityList, pokemonList, moveList } = this.state;
    return (
      <Fragment>
        <div className="search-card">
          <div className="card-head">
            <h2>Welcome To Poke World</h2>
          </div>
          <div className="card-body">
            <div className="search-bar">
              <input
                type="text"
                className="first"
                value={this.state.searchedText}
                placeholder="Search Here..."
                onChange={this.onSearchTextChange}
                onKeyPress={this.onEnterPress}
              />
              <div className="last" onClick={this.onSearchClicked}>
                <FontAwesomeIcon icon={["fas", "search"]} />
              </div>
            </div>
            <p
              className={
                "search-comments" + (this.state.showTextLenErr ? " error" : "")
              }
            >
              Atleast 2 character.<br/> Wait For Loading
            </p>
          </div>
          <div className="card-foot">
            <p>
              This project is still under construction.
              <br />
              Lockdown time pass
            </p>
            <p>Made By</p>
            <p>Qzoz @github.com/Qzoz</p>
          </div>
        </div>
        <div className="search-result">
          {typeList &&
          !typeList.length &&
          pokemonList &&
          !pokemonList.length &&
          abilityList &&
          !abilityList.length &&
          moveList &&
          !moveList.length ? (
            <p className="not-found-fallback">No Match Found</p>
          ) : null}

          <TypeSet typeList={typeList} />
          <PokemonSet pokemonList={pokemonList} />
          <AbilitySet abilityList={abilityList} />
          <MoveSet key={`key-${this.state.searchedText}`} moveList={moveList} />
        </div>
      </Fragment>
    );
  }
}

export default Home;
