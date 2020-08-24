import React, { Component } from "react";
import "./PokeModal.scss";
import axios from "axios";
import FontAwesomeIcon from "../../FontAwesome";
import PokeKeyValueChip from "../poke_modal_components/PokeKeyValueChip";
import { capitalizedName } from "../../misc/poke_misc";
import Loader from "../../misc_components/loading/Loader";
import PokeModalContent from "./PokeModalContent";
import OnError from "../../misc_components/error/OnError";
import pokeUrls from "../../misc/pokeUrls";

class PokeModal extends Component {
  constructor(props) {
    super(props);
    this.updatePokeData = this.updatePokeData.bind(this);
    this.openModalContent = this.openModalContent.bind(this);
    this.fetchPokemonDetail = this.fetchPokemonDetail.bind(this);
    this.modalContentRef = React.createRef();
    this.state = {
      doneLoading: false,
      pokeDataError: false,
      pokeDataErrorMsg: null,
      pokeId: 0,
      pokeName: null,
      height: 0,
      weight: 0,
      abilities: [],
      svgImgUrl: null,
      stats: {},
      types: [],
      pokeForms: null,
      species: null,
      evolutionUrl: null,
      varieties: [],
    };
  }

  componentDidMount() {
    this.updatePokeData();
  }

  componentDidUpdate() {
    if (this.state.pokeId !== this.props.activePokeId) {
      if (!this.state.pokeDataError) {
        this.updatePokeData();
      }
    }
  }

  updatePokeData() {
    if (this.state.doneLoading) {
      this.setState({
        doneLoading: false,
      });
    }
    this.fetchPokemonDetail(pokeUrls.pokemon.getById(this.props.activePokeId));
  }

  updateStateVars(updateParams) {
    const {
      pokeData,
      hasErrorData,
      errorMsgData,
    } = updateParams;

    const updatedState = {
      doneLoading: true,
    };
    if (hasErrorData) {
      updatedState.pokeDataError = true;
      updatedState.pokeDataErrorMsg = errorMsgData;
    } else {
      updatedState.pokeDataError = false;
      updatedState.pokeId = pokeData.id;
      updatedState.pokeName = pokeData.name;
      updatedState.abilities = pokeData.abilities;
      updatedState.height = pokeData.height;
      updatedState.weight = pokeData.weight;
      updatedState.stats = pokeData.statList;
      updatedState.types = pokeData.types;
      updatedState.pokeForms = pokeData.pokeForms;
      updatedState.species = pokeData.species;
      updatedState.evolutionUrl = pokeData.species.evolutionChain;
      updatedState.varieties = pokeData.species.varieties;
    }
    this.setState(updatedState);
  }

  async fetchPokemonDetail(dataUrl) {
    const updateParams = {
      pokeData: null,
      hasErrorData: false,
      errorMsgData: null,
    };
    try {
      updateParams.pokeData = (await axios.get(dataUrl)).data;
    } catch (error) {
      updateParams.hasErrorData = true;
      updateParams.errorMsgData = error.message;
    }
    this.updateStateVars(updateParams);
  }

  openModalContent() {
    if (this.modalContentRef && this.modalContentRef.current) {
      this.modalContentRef.current.classList.add("opened");
      setTimeout(() => {
        this.modalContentRef.current.classList.add("toped-scrollable");
        this.modalContentRef.current.scrollTop = 0;
      }, 500);
    }
  }

  closeModalContent(callbackFn) {
    if (this.modalContentRef && this.modalContentRef.current) {
      this.modalContentRef.current.classList.remove("toped-scrollable");
      this.modalContentRef.current.classList.remove("opened");
    }
    setTimeout(() => {
      callbackFn();
    }, 500);
  }

  render() {
    const { pokeId, pokeName, species, pokeForms } = this.state;
    let pokeNameC = "";
    if (pokeForms && pokeForms[0] && pokeForms[0].name !== pokeForms[0].enName)
      pokeNameC = pokeForms[0].enName;
    else pokeNameC = species ? species.enName : capitalizedName(pokeName);

    let modalContent = null;
    let modalIdNameChip = null;
    if (
      this.state.doneLoading &&
      !this.state.pokeDataError &&
      this.props.isModalOpen
    ) {
      modalContent = (
        <div className="modal-content" ref={this.modalContentRef}>
          <PokeModalContent
            {...{
              pokeId: pokeId,
              pokeName: pokeName,
              height: this.state.height,
              weight: this.state.weight,
              evolutionUrl: this.state.evolutionUrl,
              types: this.state.types,
              stats: this.state.stats,
              abilities: this.state.abilities,
              varieties: this.state.varieties,
              pokeNameC: pokeNameC,
              genus: this.state.species.enGenus,
              genderRate: this.state.species.genderRate,
            }}
          />
        </div>
      );
      modalIdNameChip = (
        <PokeKeyValueChip
          tag={pokeId}
          val={pokeNameC}
          isTagNum={true}
          tagPreffix="#"
          isSingle={true}
        />
      );
      setTimeout(() => this.openModalContent(), 500);
    }
    return (
      <div
        className={`modal-container ${
          this.props.isModalOpen ? "opened" : "closed"
        }`}
      >
        <div className="modal-heading">
          {modalIdNameChip ? modalIdNameChip : <span></span>}
          <FontAwesomeIcon
            icon={["fas", "times"]}
            className="modal-close"
            onClick={() => this.closeModalContent(this.props.onModalClose)}
          />
        </div>
        <Loader loadingText="Cooking" isLoaded={this.state.doneLoading} />
        <OnError
          showRetry
          showError={this.state.pokeDataError}
          errorMsg={this.state.pokeDataErrorMsg}
          retryMsg="Check the connection and try again."
          onRetry={() => {
            this.updatePokeData();
          }}
        />
        {modalContent}
      </div>
    );
  }
}

export default PokeModal;
