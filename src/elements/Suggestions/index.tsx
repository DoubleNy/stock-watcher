import React from "react";

import {StringMap} from "commonlib/utils";

import "./_index.scss";

type SuggestionsProps = {
  suggestions: StringMap[];
  onSelection: (value: string) => void;
};

const Suggestions: React.FunctionComponent<SuggestionsProps> = (props) => {
  const { suggestions } = props;
  return (
    <ul className="box suggestions">
      {suggestions.map((suggestion, index) => (
        <li key={index} className="suggestion" onClick={() => props.onSelection(suggestion['symbol'])}>
          <span className="suggestion--symbol"> {suggestion['symbol']} </span> <span className="suggestion--name">{suggestion['name']}</span>
        </li>
      ))}
    </ul>
  );
};

export default Suggestions;
