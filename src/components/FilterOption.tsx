import * as React from "react";

interface FilterOptionProps {
  id: string;
  name: string;
  text: string;
  onChange: any;
  checked: boolean;
}

const FilterOption: React.FC<FilterOptionProps> = props => {
  return (
    <label className={props.name}>
      <input
        id={props.id}
        className={`${props.name}__option`}
        type="checkbox"
        name={`${props.name}__option`}
        value={props.name}
        onChange={props.onChange}
        checked={props.checked}
      />
      {props.text}
    </label>
  );
};

export default FilterOption;
