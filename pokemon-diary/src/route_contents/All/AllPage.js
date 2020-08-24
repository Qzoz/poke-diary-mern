import React, { Component, Fragment } from "react";
import axios from "axios";
import PokeCards from "../../poke_components/poke_cards/PokeCards";
import PageTurner from "../components/PageTurner";
import pokeUrls from "../../misc/pokeUrls";
import Sorter from "../../components/sort_component/Sorter";
import ToggleButton from "../../components/toggle_button/ToggleButton";
import CountLabel from "../../components/count_label/CountLabel";

class AllPage extends Component {
  constructor(props) {
    super(props);
    this.onPageChangeHandler = this.onPageChangeHandler.bind(this);
    this.onPageNumChangeHandler = this.onPageNumChangeHandler.bind(this);
    this.onPageNumEntered = this.onPageNumEntered.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.pageInitialize = this.pageInitialize.bind(this);
    this.pokeURL = pokeUrls.pokemon.getAll();
    this._isMounted = false;
    this.initPageLen = 20;
    this.state = {
      pageLen: 20,
      pokemonCtr: 0,
      pokemonPrev: null,
      pokemonNext: null,
      pokemonList: [],
      pageNo: 0,
      pageNum: 0,
      pageCount: 0,
      showDetails: false,
      sortBy: "id",
      sortType: 1,
    };
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this.pageInitialize({
      sortBy: this.state.sortBy,
      sortType: this.state.sortType,
    });
  }

  pageInitialize(filterParams = {}, pageLen = this.initPageLen) {
    filterParams.details = 1;
    axios
      .get(this.pokeURL, { params: filterParams })
      .then((result) => {
        this._isMounted &&
          this.setState({
            pageLen: pageLen,
            pokemonCtr: result.data.pokemonCount,
            pageCount:
              result.data.pokemonCount % pageLen !== 0
                ? Math.round(result.data.pokemonCount / pageLen + 1)
                : Math.round(result.data.pokemonCount / pageLen),
            pageNo: 1,
            pageNum: 1,
            pokemonNext: result.data.nextPageUrl,
            pokemonPrev: result.data.prevPageUrl,
            pokemonList: result.data.pokemons,
          });
      })
      .catch((error) => {
        console.log("Unable to Load: " + error.message);
      });
  }

  fetchUrlforState(url, pageNum, filterParams = {}) {
    const pageNo = pageNum;
    filterParams.sortBy = this.state.sortBy;
    filterParams.sortType = this.state.sortType;
    filterParams.details = 1;
    axios
      .get(url, { params: filterParams })
      .then((result) => {
        this._isMounted &&
          this.setState({
            pageNo: pageNo,
            pageNum: pageNo,
            pokemonNext: result.data.nextPageUrl,
            pokemonPrev: result.data.prevPageUrl,
            pokemonList: result.data.pokemons,
          });
      })
      .catch((error) => {
        console.log("Unable to Load: " + error.message);
      });
  }

  onPageChangeHandler(direction) {
    const pageDir = direction === "prev" ? -1 : 1;
    this.onPageNumChangeHandler(this.state.pageNo + pageDir);
  }

  onPageNumEntered(e) {
    try {
      let pageNum = parseInt(e.target.value);
      if (e.target.value === "") this.setState({ pageNum: e.target.value });
      if (isNaN(pageNum)) return;
      if (pageNum > this.state.pageCount) return;
      this.setState({ pageNum: pageNum });
    } catch (error) {}
  }
  onKeyPress(e) {
    if (e.key === "Enter" && this.state.pageNum !== "")
      this.onPageNumChangeHandler(this.state.pageNum);
  }
  onPageNumChangeHandler(pageTo) {
    if (pageTo === 0) pageTo = 1;
    if (pageTo === this.state.pageNo) return;
    let limit = this.state.pageLen;
    if (pageTo * limit > this.state.pokemonCount)
      limit = this.state.pokemonCount - (pageTo - 1) * limit;
    this.fetchUrlforState(pokeUrls.pokemon.getAll(), pageTo, {
      pageOffset: (pageTo - 1) * this.state.pageLen,
      pageLimit: limit,
    });
  }

  render() {
    const {
      pokemonList,
      pokemonPrev,
      pokemonNext,
      pokemonCtr,
      pageNo,
      pageCount,
      pageNum,
    } = this.state;
    let pageTurnerStruct = {};
    if (pokemonList && pokemonList.length !== 0) {
      pageTurnerStruct = {
        isFirst: pokemonPrev == null,
        isLast: pokemonNext == null,
        fromNo: pokemonList[0].id,
        toNo: pokemonList[pokemonList.length - 1].id,
        pageNo: pageNo,
        pageCount: pageCount,
        pageNum: pageNum,
      };
    }
    return (
      <Fragment>
        <CountLabel label="Pokemon Count" value={pokemonCtr} />
        <div className="card-options-row">
          <Sorter
            selected="id"
            sortMap={{
              id: "#ID",
              name: "Name",
              height: "Height",
              weight: "Weight",
              "statList.0.baseStat": "HP",
              "statList.1.baseStat": "Attack",
              "statList.2.baseStat": "Defence",
              "statList.5.baseStat": "Speed",
              "statList.3.baseStat": "Sp. Att.",
              "statList.4.baseStat": "Sp. Def",
            }}
            onSortChange={(sortBy, sortType) => {
              this.pageInitialize({ sortBy: sortBy, sortType: sortType });
              this.setState({ sortBy: sortBy, sortType: sortType });
            }}
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
        <div className="card-holder">
          {pokemonList.length
            ? pokemonList.map((value) => {
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
                    key={`key-${value.id}`}
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
        {pokemonList.length ? (
          <PageTurner
            struct={pageTurnerStruct}
            onPageChange={this.onPageChangeHandler}
            onKeyPress={this.onKeyPress}
            onPageNumEntered={this.onPageNumEntered}
          />
        ) : null}
      </Fragment>
    );
  }
}

export default AllPage;
