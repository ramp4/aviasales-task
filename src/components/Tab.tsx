import * as React from "react";
import { MouseEvent } from "react";
import "./Tab.scss";
interface TabProps {
  onClickHandler: (event: MouseEvent) => void;
  id: string;
  innerText: string;
  classType: string;
}

const Tab: React.FC<TabProps> = props => {
  return (
    <button
      className={`tab ${props.classType}`}
      id={props.id}
      onClick={props.onClickHandler}
    >
      {props.innerText}
    </button>
  );
};

export default Tab;
