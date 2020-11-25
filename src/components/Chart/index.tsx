import React, { useEffect, useState } from "react";

import { CandleStick } from "components/CandleStick";
import { LineChart } from "components/LineChart";
import Message from "elements/Message";
import Toggle from "elements/Toggle";

import { createIconElement } from "commonlib/icons/utils";

import { ReactComponent as CandleStickChartIcon } from "icons/candlestick.svg";
import { ReactComponent as LineChartIcon } from "icons/line.svg";

import "./_index.scss";

export type Item = {
  [name: string]: number | string;
};

enum ChartMode {
  CANDLESTICK,
  LINE,
}

export type ChartProps = {
  classNames?: string;
  items: Item[];
  showAverage?: boolean;
};

const Chart: React.FunctionComponent<ChartProps> = (props) => {
  const [mean, setMean] = useState<number>(0);
  const [showMean, setShowMean] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [chartMode, setChartMode] = useState(ChartMode.LINE);

  const [domain, setDomain] = useState<[number, number]>();

  useEffect(() => {
    const normalize = (volume: number, minX: number, maxX: number, range: { lower: number; upper: number }) => {
      const x = range.upper - (range.lower * (volume - minX)) / (maxX - minX) + range.lower;
      console.log(x);
      return x;
    };

    if (props.items) {
      let min = 1e9;
      let max = -1;

      let vMin = 1e9;
      let vMax = -1;

      const sum = props.items.reduce((prev, next) => {
        min = Math.min(+next.open, min);
        vMin = Math.min(+next.volume, vMin);

        max = Math.max(+next.open, max);
        vMax = Math.max(+next.volume, vMax);

        return prev + +next.open;
      }, 0);

      const lowerBound = Math.round(Math.max(0, min - (min / 100) * 10));
      const upperBound = Math.round(max + (max / 100) * 10);
      const mean = sum / props.items.length;

      setDomain([lowerBound, upperBound]);
      setMean(mean);
      setShowChart(props.items && props.items.length > 0);
    }
  }, [props.items]);

  const handleDisplayAverage = (checked: boolean) => {
    setShowMean(checked);
  };

  const handleChangeChart = (chartMode: ChartMode) => {
    setChartMode(chartMode);
  };

  return (
    <div className={props.classNames ?? props.classNames}>
      {props.items && showChart ? (
        <>
          <div className="configurations--bar">
            <Toggle
              classNames="average--price"
              size="is-small"
              type="is-info"
              onToggle={handleDisplayAverage}
              isRounded
            />
            {chartMode === ChartMode.CANDLESTICK
              ? createIconElement(LineChartIcon, { handleClick: () => handleChangeChart(ChartMode.LINE) })
              : createIconElement(CandleStickChartIcon, {
                  handleClick: () => handleChangeChart(ChartMode.CANDLESTICK),
                })}
          </div>
          {chartMode === ChartMode.CANDLESTICK ? (
            <CandleStick data={props.items} mean={showMean && mean} domain={domain} />
          ) : (
            <LineChart data={props.items} mean={showMean && mean} domain={domain} />
          )}
        </>
      ) : (
        <Message
          type="is-dark"
          header="No loaded data"
          body="Search for a stock and select date range to display data"
        />
      )}
    </div>
  );
};

export default Chart;
