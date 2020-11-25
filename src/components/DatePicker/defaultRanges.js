import {
  subBusinessDays,
  subMonths,
  addDays,
  subYears,
  startOfYear,
  isSameDay,
  differenceInCalendarDays,
  endOfDay,
} from "date-fns";

const defines = {
  startOfToday: endOfDay(new Date()),
  endOfToday: endOfDay(new Date()),
};

const staticRangeHandler = {
  range: {},
  isSelected(range) {
    const definedRange = this.range();
    return isSameDay(range.startDate, definedRange.startDate) && isSameDay(range.endDate, definedRange.endDate);
  },
};

export function createStaticRanges(ranges) {
  return ranges.map((range) => ({ ...staticRangeHandler, ...range }));
}

export const defaultStaticRanges = createStaticRanges([
  {
    label: "5D",
    range: () => ({
      startDate: subBusinessDays(defines.startOfToday, 6),
      endDate: defines.endOfToday,
    }),
  },
  {
    label: "1M",
    range: () => ({
      startDate: subMonths(defines.startOfToday, 1),
      endDate: defines.endOfToday,
    }),
  },
  {
    label: "3M",
    range: () => ({
      startDate: subMonths(defines.startOfToday, 3),
      endDate: defines.endOfToday,
    }),
  },
  {
    label: "6M",
    range: () => ({
      startDate: subMonths(defines.startOfToday, 6),
      endDate: defines.endOfToday,
    }),
  },
  {
    label: "YTD",
    range: () => ({
      startDate: startOfYear(defines.startOfToday),
      endDate: defines.endOfToday,
    }),
  },
  {
    label: "1Y",
    range: () => ({
      startDate: subYears(defines.startOfToday, 1),
      endDate: defines.endOfToday,
    }),
  },
  {
    label: "5Y",
    range: () => ({
      startDate: subYears(defines.startOfToday, 5),
      endDate: defines.endOfToday,
    }),
  },
]);

export const defaultInputRanges = [
  {
    label: 'days up to today',
    range(value) {
      return {
        startDate: addDays(defines.startOfToday, (Math.max(Number(value), 1) - 1) * -1),
        endDate: defines.endOfToday,
      };
    },
    getCurrentValue(range) {
      if (!isSameDay(range.endDate, defines.endOfToday)) return '-';
      if (!range.startDate) return '∞';
      return differenceInCalendarDays(defines.endOfToday, range.startDate) + 1;
    },
  },
  // {
  //   label: 'days starting today',
  //   range(value) {
  //     const today = new Date();
  //     return {
  //       startDate: today,
  //       endDate: addDays(today, Math.max(Number(value), 1) - 1),
  //     };
  //   },
  //   getCurrentValue(range) {
  //     if (!isSameDay(range.startDate, defineds.startOfToday)) return '-';
  //     if (!range.endDate) return '∞';
  //     return differenceInCalendarDays(range.endDate, defineds.startOfToday) + 1;
  //   },
  // },
];