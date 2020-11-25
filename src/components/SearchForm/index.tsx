import React, { ChangeEvent, useEffect, useState } from "react";

import Field from "elements/Field";
import Button from "elements/Button";
import InputWithSuggestions from "elements/InputWithSuggestions";

import httpRequest, { HttpResponse } from "communication/protocols/http/request";
import { getSearchSugesstions, StringMap } from "commonlib/utils";
import { HttpMethod } from "communication/protocols/http/utils";

import "./_index.scss";

export type SearchFormProps = {
  onSearch: (value: string) => void;
  isLoading?: boolean;
};

const MAX_SUGGESTIONS = 5;

const SearchForm: React.FunctionComponent<SearchFormProps> = (props) => {
  const [value, setValue] = useState<string>();
  const [suggestions, setSuggestions] = useState<StringMap[]>([]);

  useEffect(() => {
    const localStorageValue = localStorage.getItem("value");
    if (localStorageValue) {
      setValue(localStorageValue);
    }
  }, []);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    localStorage.setItem("value", event.target.value);
  };

  const validateInputValue = async () => {
    if (suggestions && suggestions[0]) {
      return suggestions[0].symbol;
    }
    if (value) {
      const newSuggestions = await handleGetSuggestions(value);
      if (newSuggestions && newSuggestions[0]) return newSuggestions[0].symbol;
    }
  };

  const handleOnClick = async (selectionValue?: string) => {
    const searchValue = selectionValue ?? (await validateInputValue()) ?? "";

    props.onSearch && searchValue && props.onSearch(searchValue);
  };

  const handleGetSuggestions = async (value: string): Promise<StringMap[]> => {
    const { data }: HttpResponse<any> = await httpRequest({ method: HttpMethod.GET, url: getSearchSugesstions(value) });

    const suggestions =
      data["bestMatches"].slice(0, MAX_SUGGESTIONS).map((match: StringMap) => ({
        symbol: match["1. symbol"],
        name: match["2. name"],
      })) ?? [];

    setSuggestions(suggestions);

    return suggestions;
  };

  return (
    <Field isGrouped className="search--form">
      <InputWithSuggestions
        placeholder="Type ticker or company name"
        inputClassName="search--form__search--input is-info"
        id="test"
        onChange={handleOnChange}
        onChoose={(value: string) => {
          setValue(value);
          handleOnClick(value);
        }}
        value={value}
        getSuggestions={handleGetSuggestions}
        hideSuggestions={props.isLoading}
        hasClearBtn
        onClear={() => setValue("")}
      />
      <Button
        className="is-info search--form__search--button"
        text="Search"
        onClick={() => handleOnClick()}
        disabled={!value}
        isLoading={props.isLoading}
      />
    </Field>
  );
};

export default SearchForm;
