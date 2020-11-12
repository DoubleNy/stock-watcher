import React, {ChangeEvent} from "react";

import Field from "elements/Field";

export type ToggleProps = {
    isRounded?: boolean;
    type?: "is-info";
    classNames?: string;
    onToggle?: (value: boolean) => void;
}

const Toggle: React.FunctionComponent<ToggleProps> = (props) => {
    const getToggleClasses = () => {
        let classNames = "switch ";

        if (props.isRounded) classNames += "is-rounded";

        if (props.type) classNames += " " + props.type;

        return classNames;
    };

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.onToggle && props.onToggle(event.target.checked);
    }

    return (
        <Field className={props.classNames ?? props.classNames}>
            <input type="checkbox" id="switch" className={getToggleClasses()} onChange={handleOnChange}/>
            <label htmlFor="switch">Average price</label>
        </Field>
    );
};

export default Toggle;
