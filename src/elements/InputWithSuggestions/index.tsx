import React from "react";
import { MarkRequired } from "ts-essentials";

import Input, { InputProps } from "elements/Input";
import Suggestions from "elements/Suggestions";

import { StringMap } from "commonlib/types";

type BaseInputProps = Omit<MarkRequired<InputProps, "id">, "type" | "value">;

type WithSuggestions = {
  getSuggestions: (prefix: string) => Promise<StringMap[]>;
};

type CustomInputWithSuggestionsProps = {
  onChoose: (value: string) => void;
  value?: string;
  hideSuggestions?: boolean;
} & WithSuggestions;

type InputWithSuggestionsProps = BaseInputProps & CustomInputWithSuggestionsProps;

type InputWithSuggestionsState = {
  suggestions: StringMap[];
  value: string;
  isLoading: boolean;
};

class InputWithSuggestions extends React.Component<InputWithSuggestionsProps, InputWithSuggestionsState> {
  private timeoutId: NodeJS.Timeout | undefined;

  constructor(props: InputWithSuggestionsProps) {
    super(props);

    this.timeoutId = undefined;

    this.state = {
      suggestions: [],
      value: "",
      isLoading: false,
    };
  }

  componentDidMount() {
    if (this.props.value) {
      this.setState({ ...this.state, value: this.props.value });
    }
  }

  componentDidUpdate(prevProps: Readonly<InputWithSuggestionsProps>, prevState: Readonly<InputWithSuggestionsState>) {
    if (prevProps.hideSuggestions !== this.props.hideSuggestions) {
      this.setState({ suggestions: [] });
    }
  }

  handleSelect = (value: string) => {
    this.props.onChoose(value.slice(value.indexOf("$") + 1, value.length));

    this.setState({ value, suggestions: [] });

    clearTimeout(this.timeoutId as number | undefined);
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(this.timeoutId as number | undefined);

    const { value: newValue } = event.target;
    this.setState({ value: newValue, suggestions: [] });

    if (this.props.onChange) {
      this.props.onChange(event);
    }

    if (newValue) {
      this.setState({ isLoading: true });

      const timeoutId = setTimeout(async () => {
        try {
          const newSuggestions = await this.getSuggestions(newValue);

          if (this.timeoutId === timeoutId && newSuggestions) {
            this.setState({ suggestions: newSuggestions, isLoading: false });
          }
        } catch (err) {
          console.error(err);
        }
      }, 700);

      this.timeoutId = timeoutId;
    }
  };

  async getSuggestions(value: string) {
    if (this.props.getSuggestions) {
      return await this.props.getSuggestions(value);
    }
  }

  isValueFromSuggestions = () => {
    const { value } = this.state;

    const lowerCaseValue = value.toLowerCase();

    for (const suggestion of this.state.suggestions) {
      if (suggestion["symbol"].toLowerCase() === lowerCaseValue) return true;
    }

    return false;
  };

  render() {
    const { props, state } = this;
    const { onChange, onSelect, getSuggestions, onChoose, className, hideSuggestions, ...inputProps } = props;

    return (
      <div className="suggestions--container is-relative">
        <Input
          type="text"
          value={state.value}
          onChange={this.handleChange}
          className={`${className || ""}${state.isLoading ? ` is-loading` : ""}`}
          {...inputProps}
        />
        <Suggestions suggestions={state.suggestions} onSelection={this.handleSelect} />
      </div>
    );
  }
}

export default InputWithSuggestions;
