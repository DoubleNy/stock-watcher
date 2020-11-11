import React from 'react';

import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import moment from "moment";
import Message from "elements/Message";

import {defaultDateFormat} from "commonlib/utils";

import "./_index.scss";

export type Item = {
    [name: string]: number | string;
}

export type ChartProps = {
    classNames?: string;
    items?: Item[];
}


const Chart: React.FunctionComponent<ChartProps> = (props) => {
    return <ResponsiveContainer className={props.classNames ?? props.classNames} width="60%"
                                height={500}>
        {props.items && props.items.length > 0 ?
            <LineChart
                data={props.items}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="date" tick={{fontSize: 12}} tickFormatter={(date) => moment(date).format(defaultDateFormat)}/>
                <YAxis tick={{fontSize: 12}} tickFormatter={(value) => "$" + value}/>
                <Tooltip/>
                <Line type="monotone" dataKey="open" stroke="#8884d8"/>
            </LineChart> : <div className={"message-container"}> <Message type="is-dark" header="No loaded data" body="Search for a stock and select date range to display data" /></div> }
    </ResponsiveContainer>;
}

export default Chart;