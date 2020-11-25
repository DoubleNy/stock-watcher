export type ReactComponent<P> = React.FunctionComponent<P> | React.ComponentClass<P, any>;

export type StringMap = {
  [key: string]: string;
};

export type CandleStickDataPoint = {
  date: string;
  close: number;
  open: number;
  low: number;
  high: number;
  height: number;
  errorLineHigh: number;
  errorLineLow: number;
  errorLowUp: number | null;
  errorHighUp: number | null;
  errorLowDown: number | null;
  errorHighDown: number | null;
  up: boolean;
};

export type Item = {
  [name: string]: number | string;
};

export enum ViewMode {
  CANDLESTICK,
  LINE,
}

export type CustomToolTip = {
  active: boolean;
  label: string;
  payload: any;
};

export type Range = {
  startDate?: Date;
  endDate?: Date;
  key?: string;
};
