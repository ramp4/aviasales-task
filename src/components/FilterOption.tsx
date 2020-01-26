import * as React from "react";

interface FilterOptionProps {
  name: string;
  text: string;
}

const FilterOption: React.FC<FilterOptionProps> = props => {
  return (
    <p className={props.name}>
      <input
        className={`${props.name}__option`}
        type="checkbox"
        name={`${props.name}__option`}
      />
      {props.text}
    </p>
  );
};

export default FilterOption;
