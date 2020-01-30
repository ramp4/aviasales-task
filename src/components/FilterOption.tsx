import * as React from "react";
import "./FilterOption.scss";

interface FilterOptionProps {
  id: string;
  name: string;
  text: string;
  onChange: any;
  checked: boolean;
}

const FilterOption: React.FC<FilterOptionProps> = props => {
  return (
    <div className={`${props.name} filter_option`}>
      <input
        id={props.id}
        className={`${props.name}__option filter_checkbox checkbox`}
        type="checkbox"
        name={`${props.name}__option`}
        value={props.name}
        onChange={props.onChange}
        checked={props.checked}
      />
      <label htmlFor={props.id} className="control-checkbox control">
        {props.text}
      </label>
    </div>
  );
};

export default FilterOption;
