import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { CandleStick } from "components/CandleStick";
import { LineChart } from "components/LineChart";
import Message from "elements/Message";
import Toggle from "elements/Toggle";

import { createIconElement } from "commonlib/icons/utils";
import { StoreState } from "store";
import { CustomToolTip, Item, ViewMode } from "commonlib/types";

import { ReactComponent as CandleStickChartIcon } from "icons/candlestick.svg";
import { ReactComponent as LineChartIcon } from "icons/line.svg";

import "./_index.scss";

type ChartProps = {
  classNames?: string;
  filteredData: Item[];
  showAverage?: boolean;
};

export const getCustomToolTipContent = (data: CustomToolTip) => {
  if (data.active) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`Date: ${data.label}`}</p>
        <p className="open">{`Open: ${data.payload[0].payload["open"]}`}</p>
        <p className="close">{`Close: ${data.payload[0].payload["close"]}`}</p>
      </div>
    );
  }

  return null;
};

const Chart: React.FunctionComponent<ChartProps> = (props) => {
  const [mean, setMean] = useState<number>(0);
  const [showMean, setShowMean] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [viewMode, setViewMode] = useState(ViewMode.LINE);
  const [animate, setAnimate] = useState(true);

  const [domain, setDomain] = useState<[number, number]>();

  useEffect(() => {
    if (props.filteredData) {
      let min = 1e9;
      let max = -1;

      let vMin = 1e9;
      let vMax = -1;

      const sum = props.filteredData.reduce((prev, next) => {
        min = Math.min(+next.open, min);
        vMin = Math.min(+next.volume, vMin);

        max = Math.max(+next.open, max);
        vMax = Math.max(+next.volume, vMax);

        return prev + +next.open;
      }, 0);

      const lowerBound = Math.round(Math.max(0, min - (min / 100) * 10));
      const upperBound = Math.round(max + (max / 100) * 10);
      const mean = sum / props.filteredData.length;

      setDomain([lowerBound, upperBound]);
      setMean(mean);
      setAnimate(false);
      setShowChart(props.filteredData && props.filteredData.length > 0);
    }
  }, [props.filteredData]);

  const handleDisplayAverage = (checked: boolean) => {
    setShowMean(checked);
  };

  const handleUpdateChart = (viewMode: ViewMode) => {
    setViewMode(viewMode);
    setAnimate(true);
  };

  return (
    <div className={props.classNames ?? props.classNames}>
      {props.filteredData && showChart ? (
        <>
          <div className="configurations--bar">
            <Toggle
              classNames="average--price"
              size="is-small"
              type="is-info"
              onToggle={handleDisplayAverage}
              isRounded
            />
            {viewMode === ViewMode.CANDLESTICK
              ? createIconElement(LineChartIcon, { handleClick: () => handleUpdateChart(ViewMode.LINE) })
              : createIconElement(CandleStickChartIcon, {
                  handleClick: () => handleUpdateChart(ViewMode.CANDLESTICK),
                })}
          </div>
          {viewMode === ViewMode.CANDLESTICK ? (
            <CandleStick data={props.filteredData} mean={showMean && mean} domain={domain} animate={animate} />
          ) : (
            <LineChart data={props.filteredData} mean={showMean && mean} domain={domain} animate={animate} />
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

const mapStateToProps = (state: StoreState) => ({
  filteredData: state.filteredData,
});

export default connect(mapStateToProps)(Chart);
