import * as React from "react";
import { useState } from "react";
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
} from "recharts";
import { Item } from "components/Chart";
import moment from "moment";

import { defaultDateFormat } from "commonlib/utils";

interface CandleStickProps {
  data: Item[];
  mean: number | false;
  domain?: [number, number];
}

export const CandleStick: React.FunctionComponent<CandleStickProps> = (props) => {
  const [colorUp] = useState("#00906F");
  const [colorDown] = useState("#B23507");
  const [barWidth] = useState(10);
  const [lineWidth] = useState(2.1);

  const data = props.data.map((point: Item): any => {
    return {
      date: point.date,
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
    };
  });

  return (
    <ResponsiveContainer height={500}>
      <ComposedChart
        data={data}
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
        {console.log(props.domain)}
        <YAxis allowDataOverflow tick={{ fontSize: 12 }} tickFormatter={(value) => "$" + value} domain={props.domain} />

        {/*Floating bar*/}
        <Bar dataKey="low" fillOpacity={0} stackId={"stack"} />
        <Bar isAnimationActive={false} dataKey="height" stackId={"stack"} barSize={barWidth}>
          {data.map((entry) => (
            <Cell fill={entry.up ? colorUp : colorDown} />
          ))}
        </Bar>

        {/*Error down*/}
        <Line dataKey={"errorLineHigh"} stroke={"none"} isAnimationActive={false} dot={false}>
          <ErrorBar dataKey={"errorHighDown"} width={lineWidth} strokeWidth={lineWidth - 1} stroke={colorDown} />
        </Line>

        <Line dataKey={"errorLineLow"} stroke={"none"} isAnimationActive={false} dot={false}>
          <ErrorBar dataKey={"errorLowDown"} width={lineWidth} strokeWidth={lineWidth - 1} stroke={colorDown} />
        </Line>

        {/*Error up */}
        <Line dataKey={"errorLineHigh"} stroke={"none"} isAnimationActive={false} dot={false}>
          <ErrorBar dataKey={"errorHighUp"} width={lineWidth} strokeWidth={lineWidth - 1} stroke={colorUp} />
        </Line>

        <Line dataKey={"errorLineLow"} stroke={"none"} isAnimationActive={false} dot={false}>
          <ErrorBar dataKey={"errorLowUp"} width={lineWidth} strokeWidth={lineWidth - 1} stroke={colorUp} />
        </Line>
        {props.mean && <ReferenceLine y={props.mean} stroke="#FF7F50" opacity={0.75} strokeDasharray="5" />}
      </ComposedChart>
    </ResponsiveContainer>
  );
};
