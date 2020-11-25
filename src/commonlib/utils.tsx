import moment from "moment";

import { DEFAULT_RANGE_IN_YEARS, API_KEY } from "commonlib/constants";
import { Range } from "commonlib/types";

export const getAlphaVantageUrl = (value: string) =>
  `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${value}&outputsize=full&apikey=${API_KEY}`;
export const getSearchSugesstions = (value: string) =>
  `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${value}&apikey=${API_KEY}`;

export const getInitialRange = (): Range => {
  const today: Date = new Date();

  return {
    startDate: moment(today).subtract(DEFAULT_RANGE_IN_YEARS, "year").toDate(),
    endDate: today,
  };
};

export const trimName = (name: string) => {
  const startIdx = name.indexOf(" ") + 1;
  return name.slice(startIdx);
};
