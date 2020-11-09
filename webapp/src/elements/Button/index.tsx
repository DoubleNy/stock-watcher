import React from "react";

interface ButtonProps
    extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    text?: string;
}

const Button: React.FunctionComponent<ButtonProps> = (props) => {
    return (
        <button
            type={props.type}
            name={props.name}
            className={`button ${props.className ? props.className : ""}`}
            disabled={props.disabled}
            onClick={props.onClick}
        >

            {props.text && props.children ? <span>{props.text}</span> : props.text}

            {props.children}
        </button>
    );
};

export default Button;
