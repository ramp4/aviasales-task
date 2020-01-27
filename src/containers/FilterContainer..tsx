import * as React from "react";
import FilterOption from "../components/FilterOption";
import { filterOptionsNames } from "../data/filterOptionsNames";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as MyTypes from "MyTypes";
import { OptionsModel } from "../reducers/filterReducer";
import { filterActionsTypes } from "../actions/filterActions";

interface FilterContainerState {
  render: boolean;
}

interface FilterContainerProps {
  filterOptions: OptionsModel;
  setOptions: (filterOptions: OptionsModel, clickedIndex: number) => object;
}

class FilterContainer extends React.Component<
  FilterContainerProps,
  FilterContainerState
> {
  constructor(props: FilterContainerProps) {
    super(props);
    this.state = {
      render: false
    };
  }

  handleOptionChange = (e: any) => {
    let { id } = e.currentTarget;
    this.props.setOptions(this.props.filterOptions, id);
    this.setState({});
  };

  render() {
    return (
      <aside className="filter">
        <h3>Количество пересадок</h3>
        {Object.entries(this.props.filterOptions).map((item, index) => {
          return (
            <FilterOption
              id={"" + index}
              key={index}
              name={filterOptionsNames[index].name}
              text={filterOptionsNames[index].text}
              onChange={this.handleOptionChange}
              checked={item[1] === true}
            />
          );
        })}
      </aside>
    );
  }
}

const MapStateToProps = (store: MyTypes.ReducerState) => {
  return {
    filterOptions: store.filter.filterOptions
  };
};

const MapDispatchToProps = (dispatch: Dispatch<MyTypes.RootAction>) => ({
  setOptions: (filterOptions: OptionsModel, clickedIndex: number) =>
    dispatch({
      type: filterActionsTypes.SET_FILTER_OPTION,
      payload: {
        filterOptions,
        clickedIndex
      }
    })
});

export default connect(MapStateToProps, MapDispatchToProps)(FilterContainer);
