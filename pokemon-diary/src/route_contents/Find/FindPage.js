import React, { Component, Fragment } from "react";
import TextInput from "../../components/text_input/TextInput";
import DropDown from "../../components/dropdown/DropDown";
import SliderBlocks from "./SliderBlocks";
import axios from "axios";
import pokeUrls from "../../misc/pokeUrls";
import SearchResults from "./SearchResults";

class FindPage extends Component {
  constructor(props) {
    super(props);
    this.resultRef = React.createRef();
    this.idRef = React.createRef();
    this.nameRef = React.createRef();
    this.weightRef = React.createRef();
    this.heightRef = React.createRef();
    this.hpRef = React.createRef();
    this.attackRef = React.createRef();
    this.defenseRef = React.createRef();
    this.spAttackRef = React.createRef();
    this.spDefenseRef = React.createRef();
    this.speedRef = React.createRef();
    this.prepareParamAndSearch = this.prepareParamAndSearch.bind(this);
    this.resetParams = this.resetParams.bind(this);
    this.weightRange = [0, 1000];
    this.heightRange = [0, 20];
    this.statRange = [0, 255];
    this.abilityMap = {};
    this._isMounted = false;
    this.typeOption = {
      "0": "Any",
      "1": "Normal",
      "2": "Fighting",
      "3": "Flying",
      "4": "Poison",
      "5": "Ground",
      "6": "Rock",
      "7": "Bug",
      "8": "Ghost",
      "9": "Steel",
      "10": "Fire",
      "11": "Water",
      "12": "Grass",
      "13": "Electric",
      "14": "Psychic",
      "15": "Ice",
      "16": "Dragon",
      "17": "Dark",
      "18": "Fairy",
    };
    this.state = {
      id: "",
      name: "",
      type1: "0",
      type2: "0",
      abilities: [],
      ability: "0",
    };
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    axios
      .get(pokeUrls.ability.getAll())
      .then((result) => {
        this._isMounted && this.setState({ abilities: result.data });
      })
      .catch((err) => {});
  }

  getOptionsExcluding(keyExcluded) {
    const optMap = {};
    for (let key in Object.keys(this.typeOption)) {
      if (key !== keyExcluded || keyExcluded === "0") {
        optMap[key] = this.typeOption[key];
      }
    }
    return optMap;
  }

  getAbilityOptions() {
    const optionsMap = {
      "0": "Any",
    };
    if (this.state.abilities && this.state.abilities.length) {
      this.state.abilities.forEach((ability) => {
        this.abilityMap[ability.name] = ability.id;
        optionsMap[ability.name] = ability.enName;
      });
    }
    return optionsMap;
  }

  isAllFormElemAlive() {
    return (
      this.weightRef &&
      this.weightRef.current &&
      this.heightRef &&
      this.heightRef.current &&
      this.hpRef &&
      this.hpRef.current &&
      this.attackRef &&
      this.attackRef.current &&
      this.defenseRef &&
      this.defenseRef.current &&
      this.spAttackRef &&
      this.spAttackRef.current &&
      this.spDefenseRef &&
      this.spDefenseRef.current &&
      this.speedRef &&
      this.speedRef.current
    );
  }

  prepareParamAndSearch() {
    const searchMap = {};
    if (this.isAllFormElemAlive()) {
      searchMap["id"] = this.state.id;
      searchMap["name"] = this.state.name;
      searchMap["ability"] = this.abilityMap[this.state.ability] || 0;
      searchMap["type1"] = this.state.type1;
      searchMap["type2"] = this.state.type2;
      searchMap["height"] = this.heightRef.current.getValues();
      searchMap["weight"] = this.weightRef.current.getValues();
      searchMap["hp"] = this.hpRef.current.getValues();
      searchMap["attack"] = this.attackRef.current.getValues();
      searchMap["defense"] = this.defenseRef.current.getValues();
      searchMap["spAttack"] = this.spAttackRef.current.getValues();
      searchMap["spDefense"] = this.spDefenseRef.current.getValues();
      searchMap["speed"] = this.speedRef.current.getValues();
      searchMap["range"] = {
        height: this.heightRange,
        weight: this.weightRange,
        stats: this.statRange,
      };
      this.resultRef.current.searchForParams(searchMap);
    }
  }

  resetParams() {
    if (this.isAllFormElemAlive()) {
      this.heightRef.current.reset();
      this.weightRef.current.reset();
      this.hpRef.current.reset();
      this.attackRef.current.reset();
      this.defenseRef.current.reset();
      this.spAttackRef.current.reset();
      this.spDefenseRef.current.reset();
      this.speedRef.current.reset();
    }
    this.setState({
      id: "",
      name: "",
      ability: "0",
      type1: "0",
      type2: "0",
    });
    this.initIdName();
  }

  initIdName() {
    if (this.idRef && this.idRef.current) {
      this.idRef.current.setText("");
    }
    if (this.nameRef && this.nameRef.current) {
      this.nameRef.current.setText("");
    }
  }

  render() {
    return (
      <Fragment>
        <div className="poke-find-form-cont">
          <div className="form-head">
            <h2>Pokemon Search</h2>
          </div>
          <div className="form-body">
            <div className="form-groups">
              <div className="form-group-row">
                <label className="form-child-1">ID </label>
                <div className="form-child-2">
                  <TextInput
                    hint="ID..."
                    type="wholeNumber"
                    ref={this.idRef}
                    onChange={(val) => {
                      this.setState({ id: val });
                    }}
                  />
                </div>
              </div>
              <div className="form-group-row">
                <label className="form-child-1">Name </label>
                <div className="form-child-2">
                  <TextInput
                    hint="Name..."
                    ref={this.nameRef}
                    onChange={(val) => {
                      this.setState({ name: val });
                    }}
                  />
                </div>
              </div>
            </div>
            <hr className="form-divider" />
            <div className="form-groups">
              <div className="form-group-row">
                <label className="form-child-1">
                  Type 1<sup>st</sup>
                </label>
                <div className="form-child-2">
                  <DropDown
                    className="dd-full-width"
                    parentSelect
                    selected={this.state.type1}
                    dropDownMap={this.getOptionsExcluding(this.state.type2)}
                    onOptionChange={(opt) => {
                      this.setState({ type1: opt });
                    }}
                  />
                </div>
              </div>
              <div className="form-group-row">
                <label className="form-child-1">
                  Type 2<sup>nd</sup>
                </label>
                <div className="form-child-2">
                  <DropDown
                    className="dd-full-width"
                    parentSelect
                    selected={this.state.type2}
                    dropDownMap={this.getOptionsExcluding(this.state.type1)}
                    onOptionChange={(opt) => {
                      this.setState({ type2: opt });
                    }}
                  />
                </div>
              </div>
            </div>
            <hr className="form-divider" />
            <div className="form-groups">
              <div className="form-group-row">
                <SliderBlocks
                  tag="Height (m.)"
                  min={this.heightRange[0]}
                  max={this.heightRange[1]}
                  low={this.heightRange[0]}
                  high={this.heightRange[1]}
                  ref={this.heightRef}
                />
              </div>
              <div className="form-group-row">
                <SliderBlocks
                  tag="Weight (kgs.)"
                  min={this.weightRange[0]}
                  max={this.weightRange[1]}
                  low={this.weightRange[0]}
                  high={this.weightRange[1]}
                  ref={this.weightRef}
                />
              </div>
            </div>
            <hr className="form-divider" />
            <div className="form-group-row">
              <label className="form-child-1">Ability</label>
              <div className="form-child-2">
                <DropDown
                  className="dd-full-width"
                  parentSelect
                  selected={this.state.ability}
                  dropDownMap={this.getAbilityOptions()}
                  onOptionChange={(opt) => {
                    this.setState({ ability: opt });
                  }}
                />
              </div>
            </div>
            <hr className="form-divider" />
            <div className="form-groups">
              <div className="form-group-row">
                <SliderBlocks tag="HP" ref={this.hpRef} />
              </div>
              <div className="form-group-row">
                <SliderBlocks tag="Attack" ref={this.attackRef} />
              </div>
            </div>
            <div className="form-groups">
              <div className="form-group-row">
                <SliderBlocks tag="Defense" ref={this.defenseRef} />
              </div>
              <div className="form-group-row">
                <SliderBlocks tag="Spc. Att." ref={this.spAttackRef} />
              </div>
            </div>
            <div className="form-groups">
              <div className="form-group-row">
                <SliderBlocks tag="Spc. Def." ref={this.spDefenseRef} />
              </div>
              <div className="form-group-row">
                <SliderBlocks tag="Speed" ref={this.speedRef} />
              </div>
            </div>
            <hr className="form-divider" />
          </div>
          <div className="form-foot">
            <div className="form-btn-cont">
              <button className="form-btn btn-reset" onClick={this.resetParams}>
                Reset
              </button>
              <button
                className="form-btn btn-submit"
                onClick={this.prepareParamAndSearch}
              >
                Find
              </button>
            </div>
            <p className="general-info">Note: Loading time depends on Query</p>
          </div>
        </div>
        <SearchResults ref={this.resultRef} />
      </Fragment>
    );
  }
}

export default FindPage;
