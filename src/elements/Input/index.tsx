import React from "react";

import "./_index.scss";

export interface InputProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  inputClassName?: string;
  hasClearBtn?: boolean;
  onClear?: () => void;
}

const Input: React.FunctionComponent<InputProps> = (props) => {
  const { id, inputClassName, className, hasClearBtn, ...inputProps } = props;

  const getInputClassNames = () => {
    let classNames = "input ";

    if (inputClassName) {
      classNames += ` ${inputClassName}`;
    }

    return classNames;
  };

  return (
    <div className="control">
      <input id={id} className={getInputClassNames()} autoComplete={"off"} {...inputProps} />{" "}
      {hasClearBtn && <button onClick={props.onClear} type="button" className="delete" />}
    </div>
  );
};

export default Input;
