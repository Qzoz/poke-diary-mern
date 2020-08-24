import React from "react";
import Image, { Shimmer } from "react-shimmer";
import FontAwesomeIcon from "../../FontAwesome";
import pokeUrls from "../../misc/pokeUrls";

const TypeDmRel = (props) => {
  const typeList = props.typeList ? props.typeList : [];
  return (
    <div className="poke-type-info-dm-rel">
      <div className="poke-type-info-dm-col">
        <h2>
          <FontAwesomeIcon icon={["fas", "times"]} />
          &nbsp;<span className="font-um">{props.relRatio}</span>
        </h2>
      </div>
      <div className="poke-type-info-dm-col">
        {typeList.length ? (
          typeList.map((value) => {
            return (
              <div
                key={`key-${value.name}`}
                className={`poke-small-type-chips type-${value.name}`}
              >
                <div className="chip-icon">
                  <Image
                    NativeImgProps={{
                      className: "icon",
                    }}
                    src={pokeUrls.imgTypePlain(value.name)}
                    fallback={getShimmer()}
                    errorFallback={() => getShimmer()}
                  />
                </div>
                <p className="chip-name">{value.enName}</p>
              </div>
            );
          })
        ) : (
          <div className="chip-none">
              <h2>None</h2>
          </div>
        )}
      </div>
    </div>
  );
};

const getShimmer = () => <Shimmer height={64} width={64} />;

export default TypeDmRel;
