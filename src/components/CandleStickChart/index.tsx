import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  ErrorBar,
  ComposedChart,
  Line,
  Cell,
  ResponsiveContainer,
  ReferenceLine,
  Tooltip,
} from "recharts";
import { getCustomToolTipContent } from "components/Chart";
import moment from "moment";

import { CandleStickDataPoint, Item } from "commonlib/types";
import { BAR_WIDTH, COLOR_AVERAGE, COLOR_DOWN, COLOR_UP, defaultDateFormat, LINE_WIDTH } from "commonlib/constants";

type CandleStickChartProps = {
  data: Item[];
  mean: number | false;
  domain?: [number, number];
  animate?: boolean;
};

export const CandleStickChart: React.FunctionComponent<CandleStickChartProps> = (props) => {
  const [points, setPoints] = useState<CandleStickDataPoint[]>([]);

  useEffect(() => {
    setPoints(
      props.data.map(
        (point: Item): CandleStickDataPoint => ({
          date: point.date as string,
          low: Math.min(+point.close, +point.open),
          high: Math.max(+point.close, +point.open),
          height: Math.abs(+point.close - +point.open),
          errorLineHigh: (+point.high - Math.max(+point.close, +point.open)) / 2 + Math.max(+point.close, +point.open),
          errorLineLow: Math.min(+point.close, +point.open) - (Math.min(+point.close, +point.open) - +point.low) / 2,
          errorLowUp: point.close > point.open ? (Math.min(+point.close, +point.open) - +point.low) / 2 : null,
          errorHighUp: point.close > point.open ? (+point.high - Math.max(+point.close, +point.open)) / 2 : null,
          errorLowDown: point.close <= point.open ? (Math.min(+point.close, +point.open) - +point.low) / 2 : null,
          errorHighDown: point.close <= point.open ? (+point.high - Math.max(+point.close, +point.open)) / 2 : null,
          up: point.close > point.open,
          close: point.close as number,
          open: point.open as number,
        }),
      ),
    );
  }, [props.data]);

  return (
    <ResponsiveContainer height={500}>
      <ComposedChart
        data={points}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray={"3 3"} />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 12 }}
          tickFormatter={(date) => moment(date).format(defaultDateFormat)}
        />
        <YAxis allowDataOverflow tick={{ fontSize: 12 }} tickFormatter={(value) => "$" + value} domain={props.domain} />

        {/*Floating bar*/}
        <Bar isAnimationActive={false} dataKey="low" fillOpacity={0} stackId={"stack"} />
        <Bar
          isAnimationActive={props.animate}
          isUpdateAnimationActive={false}
          dataKey="height"
          stackId={"stack"}
          barSize={BAR_WIDTH}
        >
          {points.map((entry, index) => (
            <Cell fill={entry.up ? COLOR_UP : COLOR_DOWN} key={index} />
          ))}
        </Bar>

        {/*Error down*/}
        <Line dataKey={"errorLineHigh"} stroke={"none"} isAnimationActive={false} dot={false}>
          <ErrorBar dataKey={"errorHighDown"} width={LINE_WIDTH} strokeWidth={LINE_WIDTH - 1} stroke={COLOR_DOWN} />
        </Line>

        <Line dataKey={"errorLineLow"} stroke={"none"} isAnimationActive={false} dot={false}>
          <ErrorBar dataKey={"errorLowDown"} width={LINE_WIDTH} strokeWidth={LINE_WIDTH - 1} stroke={COLOR_DOWN} />
        </Line>

        {/*Error up */}
        <Line dataKey={"errorLineHigh"} stroke={"none"} isAnimationActive={false} dot={false}>
          <ErrorBar dataKey={"errorHighUp"} width={LINE_WIDTH} strokeWidth={LINE_WIDTH - 1} stroke={COLOR_UP} />
        </Line>

        <Line dataKey={"errorLineLow"} stroke={"none"} isAnimationActive={false} dot={false}>
          <ErrorBar dataKey={"errorLowUp"} width={LINE_WIDTH} strokeWidth={LINE_WIDTH - 1} stroke={COLOR_UP} />
        </Line>

        <Tooltip content={getCustomToolTipContent} />

        {props.mean && <ReferenceLine y={props.mean} stroke={COLOR_AVERAGE} opacity={0.75} strokeDasharray="5" />}
      </ComposedChart>
    </ResponsiveContainer>
  );
};
