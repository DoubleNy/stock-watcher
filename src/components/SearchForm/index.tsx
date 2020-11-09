import React  from "react";

import Field from "elements/Field";
import Input from "elements/Input";
import Button from "elements/Button";

import "./_index.scss";

export type SearchFormProps = {
};

const SearchForm: React.FunctionComponent<SearchFormProps> = (props) => {
    return (
            <Field isGrouped>
                <Input className="search-input" inputSize="medium" placeholder="Type ticker or company name"/>
                <Button className="is-info search-button" text="Search"/>
            </Field>
    );
};

export default SearchForm;
