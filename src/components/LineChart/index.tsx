import * as React from "react";
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
import { Item } from "components/Chart";
import moment from "moment";

import { defaultDateFormat } from "commonlib/utils";

interface LineChartProps {
  mean: number | false;
  data: Item[];
  domain?: [number, number];
}

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
        <Tooltip />
        <Line type="monotone" dataKey="open" fill="#0099ff" stroke="#0099ff" dot={false} isAnimationActive={true} />

        {props.mean && <ReferenceLine y={props.mean} stroke="#FF7F50" opacity={0.75} strokeDasharray="5" />}
      </ComposedChart>
    </ResponsiveContainer>
  );
};
