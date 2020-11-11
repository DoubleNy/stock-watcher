import React, {ChangeEvent, useState} from "react";

import Field from "elements/Field";
import Input from "elements/Input";
import Button from "elements/Button";

import "./_index.scss";

export type SearchFormProps = {
    onSearch: (value: string) => void;
};

const SearchForm: React.FunctionComponent<SearchFormProps> = (props) => {
    const [value, setValue] = useState<string>();

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }

    const handleOnClick = () => {
        props.onSearch && value && props.onSearch(value);
    }

    return (
            <Field isGrouped>
                <Input className="search-input" inputSize="medium" placeholder="Type ticker or company name" onChange={handleOnChange}/>
                <Button className="is-info search-button" text="Search" onClick={handleOnClick}/>
            </Field>
    );
};

export default SearchForm;
