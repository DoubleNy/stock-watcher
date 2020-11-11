import React from 'react';

import {CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis, ResponsiveContainer} from 'recharts';

export type Item = {
    date: string,
    closeValue: string,
}

export type ChartProps = {
    classNames?: string;
    item: Item[];
}

const Chart: React.FunctionComponent<ChartProps> = (props) => {
    return (
        <ResponsiveContainer className={props.classNames ?? props.classNames} width="60%" height={500}>
            <LineChart
                data={props.item}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="date"/>
                <YAxis />
                <Tooltip/>
                <Line type="monotone" dataKey="closeValue" stroke="#8884d8" activeDot={{r: 8}}/>
            </LineChart>
        </ResponsiveContainer>
    );
}

export default Chart;