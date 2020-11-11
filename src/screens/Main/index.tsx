import React, {useState, useEffect} from "react";

import SearchForm from "components/SearchForm";
import Chart, {Item} from "components/Chart";
import RangeDatePicker, {Range} from "components/DatePicker";

import httpRequest, {HttpResponse} from "communication/protocols/http/request";
import {getAlphaVantageUrl, getInitialRange, trimName} from "commonlib/utils";

import "./_index.scss";

export type MainProps = {};

const Main: React.FunctionComponent<MainProps> = (props) => {
    const [allItems, setAllItems] = useState<Item[]>([]);
    const [filteredItems, setFilteredItems] = useState<Item[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [initalRange, setInitialRange] = useState<Range>();

    useEffect(() => {
        const initialRange = getInitialRange();
        console.log("initialRange");
        console.log(initialRange);

        setInitialRange(initialRange);
        handleUpdateRange(initialRange);

        setIsLoading(false);
    }, [allItems])

    const handleUpdateRange = (range: Range) => {
        const filteredItems = allItems.filter((el) => {
            return new Date(el.date) > range.startDate! && new Date(el.date) < range.endDate!
        })

        setFilteredItems(filteredItems);
    }

    const handleSearch = async (value: string) => {
        setIsLoading(true);
        const { data, status } : HttpResponse<any> = await httpRequest({ method: "GET", url: getAlphaVantageUrl(value)});

        const allItems: Item[] = [];

        if(status === 200) {
            Object.keys(data["Time Series (Daily)"]).forEach((date: string) => {
                let entry: Item = {
                    date,
                }

                Object.entries(data["Time Series (Daily)"][date]).forEach(function ([name, value]) {
                    const stringValue: string = value as string;
                    entry = {...entry, [trimName(name)]: +stringValue}
                })

                allItems.push(entry)
            })
        }

        setAllItems(allItems.reverse());
    };

    return <>
        <SearchForm onSearch={handleSearch} isLoading={isLoading}/>
         <div className={"container"}>
             <Chart classNames={"stock-chart"} items={filteredItems}/>
             <RangeDatePicker onChangeRange={handleUpdateRange} initialRange={initalRange}/>
         </div>
    </>
};

export default Main;
