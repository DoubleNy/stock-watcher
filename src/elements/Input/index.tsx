import React from "react";

import "./_index.scss";

export interface InputProps
    extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    inputClassName?: string;
}

const Input: React.FunctionComponent<InputProps> = (props) => {
    const {
        id,
        inputClassName,
        className,
        ...inputProps
    } = props;

    const getInputClassNames = () => {
        let classNames = "input ";

        if (inputClassName) {
            classNames += ` ${inputClassName}`;
        }

        return classNames;
    };

    return <input id={id} className={getInputClassNames()} autoComplete={"off"} {...inputProps} />

};

export default Input;
