import * as React from "react";
import FilterOption from "../components/FilterOption";
import { filterOptionsNames } from "../data/filterOptionsNames";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as MyTypes from "MyTypes";
import { OptionsModel } from "../reducers/filterReducer";
import { filterActionsTypes } from "../actions/filterActions";
import "./FilterContainer.scss";

interface FilterContainerProps {
  filterOptions: OptionsModel;
  setOptions: (filterOptions: OptionsModel, clickedIndex: number) => object;
}

const FilterContainer: React.FC<FilterContainerProps> = props => {
  const handleOptionChange = (e: Event) => {
    const id = +(e.currentTarget as Element).id;
    console.log(typeof e.currentTarget);
    props.setOptions(props.filterOptions, id);
  };

  return (
    <aside className="filter">
      <h3 className="filter_title">Количество пересадок</h3>
      {Object.entries(props.filterOptions).map((item, index) => {
        return (
          <FilterOption
            id={"" + index}
            key={index}
            name={filterOptionsNames[index].name}
            text={filterOptionsNames[index].text}
            onChange={handleOptionChange}
            checked={item[1] === true}
          />
        );
      })}
    </aside>
  );
};

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
