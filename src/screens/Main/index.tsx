import React, { useEffect, useState } from "react";
import * as Redux from "redux";
import { connect } from "react-redux";

import SearchForm from "components/SearchForm";
import Chart, { Item } from "components/Chart";
import RangeDatePicker, { Range } from "components/DatePicker";

import httpRequest, { HttpResponse } from "communication/protocols/http/request";
import { getAlphaVantageUrl, getInitialRange, trimName } from "commonlib/utils";
import { update } from "store/app-state/actions";
import { StoreState } from "store";

import "./_index.scss";

type AlphaVantageResponseDataType = {
  "Meta Data": object;
  "Time Series (Daily)": {
    [key: string]: string;
    date: string;
  };
};

export type MainProps = {
  items: Item[];
  update: typeof update;
};

const Main: React.FunctionComponent<MainProps> = (props) => {
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [range, setRange] = useState<Range>();
  const [showAverage, setShowAverage] = useState<boolean>(false);

  useEffect(() => {
    handleUpdateRange(range ?? getInitialRange());
    setIsLoading(false);
  }, [props.items]);

  const handleUpdateRange = (range: Range) => {
    const filteredItems = props.items.filter((el) => {
      return new Date(el.date) > range.startDate! && new Date(el.date) < range.endDate!;
    });

    setRange(range);
    setFilteredItems(filteredItems);
  };

  const handleSearch = async (value: string) => {
    setTimeout(() => {
      setIsLoading(false);
    }, 12000);

    setIsLoading(true);

    const { data, status }: HttpResponse<AlphaVantageResponseDataType> = await httpRequest({
      method: "GET",
      url: getAlphaVantageUrl(value),
    });
    const allItems: Item[] = [];

    const time_series = data["Time Series (Daily)"];

    if (status === 200 && time_series) {
      Object.keys(time_series).forEach((date: string) => {
        let entry: Item = {
          date,
        };

        Object.entries(time_series[date]).forEach(function ([name, value]) {
          const stringValue: string = value as string;
          entry = { ...entry, [trimName(name)]: +stringValue };
        });
        allItems.push(entry);
      });

      props.update(allItems.reverse());
    } else {
      console.log("API CALL ERROR");
      console.log("Status: " + status);
      console.log(data);
    }
  };

  return (
    <>
      <SearchForm onSearch={handleSearch} isLoading={isLoading} />
      <div className={"main--container"}>
        <Chart classNames={"main--container__chart"} items={filteredItems} showAverage={showAverage} />
        <div className="main--container__configurations">
          <RangeDatePicker onChangeRange={handleUpdateRange} initialRange={range} />
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch: Redux.Dispatch) => ({
  update: (data: Item[]) => dispatch(update(data)),
});

const mapStateToProps = (state: StoreState) => ({
  items: state.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
