const API_KEY: string = "TCVWRTR5D693E1AT";

export const getAlphaVantageUrl = (value: string) =>`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${value}&outputsize=compact&apikey=${API_KEY}`;
