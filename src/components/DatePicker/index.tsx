import React, {useState} from 'react';
import {DateRange} from 'react-date-range';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

type RangeDatePickerProps = {
    onChangeRange: (range: DateRangeT) => void;
}

export type DateRangeT = {
    startDate?: Date;
    endDate?: Date;
    key?: string;
}
const RangeDatePicker: React.FunctionComponent<RangeDatePickerProps> = (props) => {
    const [range, setRange] = useState<DateRangeT>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    })


    const handleSelect = (ranges: any) => {
        setRange(ranges.selection);
        props.onChangeRange(ranges.selection);
    }

    return (
        <DateRange
            ranges={[range]}
            onChange={handleSelect}
        />
    )
}

export default RangeDatePicker;