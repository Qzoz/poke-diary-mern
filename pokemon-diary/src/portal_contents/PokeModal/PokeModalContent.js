import React from "react";
import PokeDetailVarieties from "../poke_modal_components/PokeDetailVarieties";
import PokeDetailStats from "../poke_modal_components/PokeDetailStats";
import PokeDetailType from "../poke_modal_components/PokeDetailType";
import PokeDetailEvolution from "../poke_modal_components/PokeDetailEvolution";
import PokeKeyValueChip from "../poke_modal_components/PokeKeyValueChip";
import Image, { Shimmer } from "react-shimmer";
import pokeUrls from "../../misc/pokeUrls";
import PokeDetailMoves from "../poke_modal_components/PokeDetailMoves";
import PokeDetailAbilities from "../poke_modal_components/PokeDetailAbilities";
import RatioBar from "../../components/ratio_bar/RatioBar";
import Tooltip from "../../components/tooltip/Tooltip";

const PokeModalContent = (props) => {
  const {
    pokeId,
    pokeName,
    height,
    weight,
    evolutionUrl,
    types,
    stats,
    abilities,
    varieties,
    pokeNameC,
    genus,
    genderRate,
  } = props;
  return (
    <div className="poke-details">
      <div className="poke-detail-row">
        <div className="poke-detail-col">
          <div className="poke-detail-image-cont">
            <Image
              NativeImgProps={{ className: "poke-detail-image" }}
              src={pokeId ? pokeUrls.imgPokemon(pokeId) : ""}
              fallback={getShimmer()}
              errorFallback={() => getShimmer()}
            />
          </div>
        </div>
        <div className="poke-detail-col">
          {pokeName ? (
            <div className="poke-detail-basic">
              <PokeKeyValueChip tag="Name" val={pokeNameC} />
              <PokeKeyValueChip
                tag="Weight"
                val={weight / 10}
                isValNum={true}
                valExt="kgs."
              />
              <PokeKeyValueChip
                tag="Height"
                val={height / 10}
                isValNum={true}
                valExt="m."
              />
              <PokeKeyValueChip tag="Genus" val={genus} />
              {genderRate !== -1 ? (
                <RatioBar heading="Gender" r1={genderRate} r2={8 - genderRate}>
                  <Tooltip center>
                    <p className="gender-tag">Female</p>
                    <p className="on-hover-text">
                      {Math.round((genderRate * 1000) / 8) / 10}%
                    </p>
                  </Tooltip>
                  <Tooltip center>
                    <p className="gender-tag">Male</p>
                    <p className="on-hover-text">
                      {Math.round(((8 - genderRate) * 1000) / 8) / 10}%
                    </p>
                  </Tooltip>
                </RatioBar>
              ) : (
                <RatioBar heading="Gender" fallbackValue="Genderless" />
              )}
            </div>
          ) : null}
        </div>
      </div>
      {abilities.length ? <PokeDetailAbilities abilities={abilities} /> : null}
      {types.length ? <PokeDetailType types={types} isRight={true} /> : null}
      {stats.length ? <PokeDetailStats stats={stats} /> : null}
      {varieties.length && varieties[0].pokemon.name === pokeName ? (
        <PokeDetailVarieties
          pokeId={pokeId}
          varieties={varieties}
          isRight={true}
        />
      ) : null}
      {evolutionUrl ? (
        <PokeDetailEvolution
          key={`key-${evolutionUrl}`}
          evoUrl={evolutionUrl}
          pokeName={pokeName}
        />
      ) : null}
      <PokeDetailMoves key={`key-${pokeId}`} pokeId={pokeId} isRight />
    </div>
  );
};

const getShimmer = () => <Shimmer width={750} height={500} />;

export default PokeModalContent;
