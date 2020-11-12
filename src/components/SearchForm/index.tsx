import React, {ChangeEvent, useState} from "react";

import Field from "elements/Field";
import Button from "elements/Button";
import InputWithSuggestions from "elements/InputWithSuggestions";

import httpRequest, {HttpResponse} from "communication/protocols/http/request";
import {getSearchSugesstions, StringMap} from "commonlib/utils";
import {HttpMethod} from "communication/protocols/http/utils";

import "./_index.scss";

export type SearchFormProps = {
    onSearch: (value: string) => void;
    isLoading?: boolean;
};

const MAX_SUGGESTIONS = 5;

const SearchForm: React.FunctionComponent<SearchFormProps> = (props) => {
    const [value, setValue] = useState<string>();

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }

    const handleOnClick = () => {
        props.onSearch && value && props.onSearch(value);
    }

    const handleGetSuggestions = async (value: string): Promise<StringMap[]> => {
        const {data}: HttpResponse<any> = await httpRequest({method: HttpMethod.GET, url: getSearchSugesstions(value)});

        return data['bestMatches'].slice(0, MAX_SUGGESTIONS).map((match: StringMap) => ({
            symbol: match['1. symbol'],
            name: match['2. name']
        })) ?? [];
    }

    return (
        <Field isGrouped className="search--form">
            <InputWithSuggestions
                placeholder="Type ticker or company name"
                inputClassName="search--form__search--input"
                id="test"
                onChange={handleOnChange}
                onChoose={(value: string) => setValue(value)}
                getSuggestions={handleGetSuggestions}
            />
            <Button className="is-info search--form__search--button" text="Search" onClick={handleOnClick}
                    disabled={!value} isLoading={props.isLoading}/>
        </Field>
    );
};

export default SearchForm;
