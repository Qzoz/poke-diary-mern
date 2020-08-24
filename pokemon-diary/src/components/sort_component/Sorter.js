import React, { Component } from "react";
import "./Sorter.scss";
import DropDown from "../../components/dropdown/DropDown";
import ToggleButton from "../../components/toggle_button/ToggleButton";

class Sorter extends Component {
  constructor(props) {
    super(props);
    this.onSortByChange = this.onSortByChange.bind(this);
    this.onSortAscChange = this.onSortAscChange.bind(this);
    this.state = {
      sortBy: this.props.selected,
      sortAsc: true,
    };
  }

  onSortByChange(sortBy) {
    if (sortBy === this.state.sortBy) return;
    this.setState({ sortBy: sortBy });
    this.props.onSortChange(sortBy, this.state.sortAsc ? 1 : -1);
  }

  onSortAscChange(sortAsc) {
    this.setState({ sortAsc: sortAsc });
    this.props.onSortChange(this.state.sortBy, sortAsc ? 1 : -1);
  }

  render() {
    return (
      <div className="card-sort-container">
        <div className="card-sort sort-by">
          <p className="sort-label">Sort</p>
          <DropDown
            selected={this.props.selected}
            dropDownMap={this.props.sortMap}
            onOptionChange={(option) => {
              this.onSortByChange(option);
            }}
          />
        </div>
        <div className="card-sort sort-type">
          <ToggleButton
            isOnn
            onText="Ascending"
            offText="Descending"
            onToggle={(isOnn) => {
              this.onSortAscChange(isOnn);
            }}
          />
        </div>
      </div>
    );
  }
}

export default Sorter;
