import React, {useState} from "react";

import SearchForm from "components/SearchForm";
import Chart, {Item} from "components/Chart";
import RangeDatePicker, {DateRangeT} from "components/DatePicker";

import httpRequest from "communication/protocols/http/request";
import {getAlphaVantageUrl} from "commonlib/utils";

import "./_index.scss";

export type MainProps = {};

const Main: React.FunctionComponent<MainProps> = (props) => {
    const [all, setAll] = useState<Item[]>([]);
    const [item, setItem] = useState<Item[]>([]);

    const handleSearch = async (value: string) => {
        const { data, status } : any = await httpRequest({ method: "GET", url: getAlphaVantageUrl(value)});

        const stockMove : Item[] = [];

        for (let key in data['Time Series (Daily)']) {
            stockMove.push({
                date: key,
                closeValue: data['Time Series (Daily)'][key]['4. close']
            });
        }

        setAll(stockMove);
        setItem(stockMove);
    };

    const handleChangeRange = (range: DateRangeT) => {
        setItem(all.filter((el) => {
            return new Date(el.date) > range.startDate! && new Date(el.date) < range.endDate!;
        }));
    }

    return <>
        <SearchForm onSearch={handleSearch}/>
        {item &&
         <div className={"container"}>
             <Chart classNames={"stock-chart"} item={item}/>
             <RangeDatePicker onChangeRange={handleChangeRange}/>
         </div>}
    </>
};

export default Main;
