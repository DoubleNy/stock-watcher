import {Range} from "components/DatePicker";

import moment from "moment";

const DEFAULT_RANGE_IN_YEARS = 1;

const API_KEY: string = "TCVWRTR5D693E1AT";

export const defaultDateFormat = "DD/MM/YYYY";

export const getAlphaVantageUrl = (value: string) =>`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${value}&outputsize=full&apikey=${API_KEY}`;

export const getInitialRange = () : Range => {
    const today: Date = new Date();

    return {
        startDate: moment(today).subtract(DEFAULT_RANGE_IN_YEARS, "year").toDate(),
        endDate: today,
    };
}

export const trimName = (name: string) => {
    const startIdx = name.indexOf(" ") + 1;
    return name.slice(startIdx);
}