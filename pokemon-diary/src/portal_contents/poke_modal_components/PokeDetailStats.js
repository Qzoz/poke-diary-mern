import React, { Component } from "react";
import PokeKeyValueStatsChips from "./PokeKeyValueStatsChips";
import PokeDetailHOC from "./PokeDetailHOC";

class PokeDetailStats extends Component {
  render() {
    const statsList = this.props.stats ? this.props.stats : [];
    let totalStat = 0;
    return (
      <PokeDetailHOC
        heading="Base Stats"
        isRight={this.props.isRight}
        childClassName="poke-detail-stat-holder"
      >
        {statsList.length
          ? statsList.map((value) => {
              totalStat += value.baseStat;
              return (
                <div
                  key={`key-${value.stat.name}`}
                  className="poke-detail-stat-cont"
                >
                  <PokeKeyValueStatsChips
                    statName={value.stat.enName}
                    statVal={value.baseStat}
                  />
                </div>
              );
            })
          : null}

        <div
          key={`key-total-stat`}
          className="poke-detail-stat-cont total-stat"
        >
          <PokeKeyValueStatsChips statName="Total" statVal={totalStat} />
        </div>
      </PokeDetailHOC>
    );
  }
}

export default PokeDetailStats;
