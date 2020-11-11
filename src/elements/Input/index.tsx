import React from "react";

export interface InputProps
    extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    labelContent?: string;
    inputSize?: "small" | "medium" | "large";
    inputClassName?: string;
    isExpanded?: boolean;
    isFocused?: boolean;
}

const Input: React.FunctionComponent<InputProps> = (props) => {
    const {
        id,
        isExpanded,
        isFocused,
        inputSize,
        inputClassName,
        labelContent,
        className,
        ...inputProps
    } = props;

    const getInputClassNames = () => {
        let classNames = "input";

        if (isFocused) {
            classNames += " is-focused";
        }

        if (inputSize) {
            classNames += ` is-${inputSize}`;
        }

        if (inputClassName) {
            classNames += ` ${inputClassName}`;
        }

        return classNames;
    };

    return (
        <>
            {labelContent && <label className="label">{labelContent}</label>}
            <input id={id} className={getInputClassNames()} {...inputProps} />
        </>
    );
};

export default Input;
