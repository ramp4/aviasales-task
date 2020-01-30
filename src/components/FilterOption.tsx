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
    <div className={`${props.name} filter_option control-group`}>
      <label htmlFor={props.id} className="control-checkbox control">
        <div className="control_indicator"></div>
        <input
          id={props.id}
          className={`${props.name}__option filter_checkbox checkbox`}
          type="checkbox"
          name={`${props.name}__option`}
          value={props.name}
          onChange={props.onChange}
          checked={props.checked}
        />
        {props.text}
      </label>
    </div>
  );
};

export default FilterOption;
