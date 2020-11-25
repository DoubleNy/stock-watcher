import React from "react";

import {
  CartesianGrid,
  XAxis,
  YAxis,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  ReferenceLine,
} from "recharts";
import { getCustomToolTipContent } from "components/Chart";
import moment from "moment";

import { Item } from "commonlib/types";
import { COLOR_AVERAGE, defaultDateFormat } from "commonlib/constants";

type LineChartProps = {
  mean: number | false;
  data: Item[];
  domain?: [number, number];
  animate?: boolean;
};

export const LineChart: React.FunctionComponent<LineChartProps> = (props) => {
  return (
    <ResponsiveContainer height={500}>
      <ComposedChart
        data={props.data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 12 }}
          tickFormatter={(date) => moment(date).format(defaultDateFormat)}
        />
        <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => "$" + value} domain={props.domain} />
        <Tooltip content={getCustomToolTipContent} />
        <Line
          type="monotone"
          dataKey="open"
          fill="#0099ff"
          stroke="#0099ff"
          dot={false}
          isAnimationActive={props.animate}
        />

        {props.mean && <ReferenceLine y={props.mean} stroke={COLOR_AVERAGE} opacity={0.75} strokeDasharray="5" />}
      </ComposedChart>
    </ResponsiveContainer>
  );
};
