import React, {useEffect, useState} from "react";

import SearchForm from "components/SearchForm";
import Chart, {Item} from "components/Chart";
import RangeDatePicker, {Range} from "components/DatePicker";
import Toggle from "elements/Toggle";

import httpRequest, {HttpResponse} from "communication/protocols/http/request";
import {getAlphaVantageUrl, getInitialRange, trimName} from "commonlib/utils";

import "./_index.scss";

type AlphaVantageResponseDataType = {
    "Meta Data": object;
    "Time Series (Daily)": {
        [key: string]: string;
        date: string;
    };
}

export type MainProps = {};

const Main: React.FunctionComponent<MainProps> = (props) => {
    const [allItems, setAllItems] = useState<Item[]>([]);
    const [filteredItems, setFilteredItems] = useState<Item[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [initalRange, setInitialRange] = useState<Range>();
    const [showAverage, setShowAverage] = useState<boolean>(false);

    useEffect(() => {
        const initialRange = getInitialRange();
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

    const handleDisplayAverage = (value: boolean) => {
        setShowAverage(value);
    }

    const handleSearch = async (value: string) => {
        setTimeout(() => {
            setIsLoading(false);
        }, 10000);

        setIsLoading(true);

        const {data, status}: HttpResponse<AlphaVantageResponseDataType> = await httpRequest({
            method: "GET",
            url: getAlphaVantageUrl(value)
        });
        const allItems: Item[] = [];

        const time_series = data["Time Series (Daily)"];

        if (status === 200 && time_series) {
            Object.keys(time_series).forEach((date: string) => {
                let entry: Item = {
                    date,
                }

                Object.entries(time_series[date]).forEach(function ([name, value]) {
                    const stringValue: string = value as string;
                    entry = {...entry, [trimName(name)]: +stringValue}
                })
                allItems.push(entry)
            })

            setAllItems(allItems.reverse());
        } else {
            console.log("API CALL ERROR");
            console.log("Status: " + status);
            console.log("Body: " + {...data});
        }
    };

    return <>
        <SearchForm onSearch={handleSearch} isLoading={isLoading}/>
        <div className={"main--container"}>
            <Chart classNames={"main--container__chart"} items={filteredItems} showAverage={showAverage}/>
            <div className="main--container__configurations">
                <RangeDatePicker onChangeRange={handleUpdateRange} initialRange={initalRange}/>
                <Toggle classNames="average--price" type="is-info" onToggle={handleDisplayAverage} isRounded/>
            </div>
        </div>
    </>
};

export default Main;
