import React, { Component, Fragment } from "react";
import "./PokeMoves.scss";
import axios from "axios";
import Loader from "../../misc_components/loading/Loader";
import OnError from "../../misc_components/error/OnError";
import MovesCard from "./MovesCard";
import Sorter from "../../components/sort_component/Sorter";
import CountLabel from "../../components/count_label/CountLabel";

class PokeMoves extends Component {
  constructor(props) {
    super(props);
    this.fetchMoveList = this.fetchMoveList.bind(this);
    this.onSortChange = this.onSortChange.bind(this);
    this.moveUrl = props.moveUrl;
    this._isMounted = false;
    this.sortMap = {
      id: "#ID",
      name: "Name",
      accuracy: "Accuracy",
      effectChance: "Effect Chance",
      power: "Power",
      pp: "Power Point",
      "type.enName": "Type",
      "generation.enName": "Generation",
      "damageClass.enName": "Damage",
      "category.name": "Category",
    };
    this.state = {
      isLoaded: this.props.moveList ? true : false,
      hasError: false,
      errorMsg: "",
      moveList: [],
    };
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this.props.moveUrl && this.fetchMoveList();
  }

  fetchMoveList() {
    axios
      .get(this.moveUrl)
      .then((result) => {
        this._isMounted &&
          this.setState({
            moveList: result.data,
            hasError: false,
            isLoaded: true,
          });
      })
      .catch((err) => {
        this._isMounted &&
          this.setState({
            errorMsg: err.message,
            hasError: true,
            isLoaded: true,
          });
      });
  }

  onSortChange(sortBy, sortType) {
    function getVal(doc, param) {
      if (param.length === 1) return doc[param[0]];
      return doc[param[0]][param[1]];
    }
    try {
      const moves = this.state.moveList.slice(0);
      const sortParams = sortBy.split(".");
      moves.sort((m1, m2) => {
        if (getVal(m1, sortParams) < getVal(m2, sortParams)) {
          return sortType === 1 ? -1 : 1;
        } else if (getVal(m1, sortParams) > getVal(m2, sortParams)) {
          return sortType === 1 ? 1 : -1;
        } else {
          if (getVal(m1, ["id"]) <= getVal(m2, ["id"])) {
            return -1;
          } else {
            return 1;
          }
        }
      });
      this.setState({ moveList: moves });
    } catch (err) {}
  }

  injectMoveList() {
    this.setState({
      isLoaded: true,
      hasError: false,
      moveList: this.props.moveList,
    });
  }

  render() {
    let { moveList, isLoaded, hasError, errorMsg } = this.state;
    let sortVisible = true;
    if (!moveList.length && this.props.moveList && this.props.moveList.length) {
      moveList = this.props.moveList;
      sortVisible = false;
    }
    return (
      <Fragment>
        <Loader isLoaded={isLoaded} loadingText="Cooking" />
        <OnError
          showError={isLoaded && hasError}
          errorMsg={errorMsg}
          showRetry
          onRetry={this.fetchMoveList}
          retryMsg="Click to Retry Again"
        />
        {isLoaded && !hasError && moveList.length ? (
          <Fragment>
            <CountLabel label="Moves Count" value={moveList.length} />
            {sortVisible ? (
              <Sorter
                selected="id"
                sortMap={this.sortMap}
                onSortChange={this.onSortChange}
              />
            ) : null}
            <div className="poke-moves-container">
              {moveList.map((move, index) => {
                return (
                  <MovesCard
                    key={`key-${move.id}`}
                    move={move}
                    index={index + 1}
                  />
                );
              })}
            </div>
          </Fragment>
        ) : null}
      </Fragment>
    );
  }
}

export default PokeMoves;
