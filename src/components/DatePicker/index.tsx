import React, {useEffect, useState} from 'react';
import {DateRangePicker} from 'react-date-range';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

type RangeDatePickerProps = {
    onChangeRange: (range: Range) => void;
    initialRange?: Range;
}

export type Range = {
    startDate?: Date;
    endDate?: Date;
    key?: string;
}

const defaultRange = {
    startDate: new Date(),
    endDate: new Date(),
}

const dateRangeKey = {
    key: 'selection'
}

const RangeDatePicker: React.FunctionComponent<RangeDatePickerProps> = (props) => {
    const [range, setRange] = useState<Range>(props.initialRange ? {...props.initialRange, ...dateRangeKey} : {...defaultRange, ...dateRangeKey});
    const [today] = useState(new Date());

    useEffect(() => {

        const range: Range = {...props.initialRange, ...dateRangeKey};

        setRange(range);

    }, [props.initialRange])


    const handleSelect = (ranges: any) => {
        setRange(ranges.selection);
        props.onChangeRange(ranges.selection);
    }

    return (
        <DateRangePicker
            maxDate={today}
            ranges={[range]}
            onChange={handleSelect}
        />
    )
}

export default RangeDatePicker;