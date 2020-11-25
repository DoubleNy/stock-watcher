import {
  addDays,
  subMonths,
  subDays,
  subYears,
  startOfMonth,
  startOfYear,
  endOfMonth,
  addMonths,
  startOfWeek,
  endOfWeek,
  isSameDay,
  differenceInCalendarDays,
} from "date-fns";

const MAX_FORECAST_DAYS = 7;

const defines = {
  today: new Date(),
  startOfYear: startOfYear(new Date()),
  endOfWeek: endOfWeek(new Date()),
  startOfLastWeek: startOfWeek(addDays(new Date(), -7)),
  endOfLastWeek: endOfWeek(addDays(new Date(), -7)),
  startOfMonth: startOfMonth(new Date()),
  endOfMonth: endOfMonth(new Date()),
  startOfLastMonth: startOfMonth(addMonths(new Date(), -1)),
  endOfLastMonth: endOfMonth(addMonths(new Date(), -1)),
  startOfThreeMonthsAgo: startOfMonth(subMonths(new Date(), 3)),
  startOfSixMonthsAgo: startOfMonth(subMonths(new Date(), 6)),
  startOfLastYear: startOfMonth(subMonths(new Date(), 24)),
  startOfFiveYearsAgo: startOfMonth(subMonths(new Date(), 12 * 5)),
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
      startDate: subDays(defines.today, 5),
      endDate: defines.today,
    }),
  },
  {
    label: "1M",
    range: () => ({
      startDate: subMonths(defines.today, 1),
      endDate: defines.today,
    }),
  },
  {
    label: "3M",
    range: () => ({
      startDate: subMonths(defines.today, 3),
      endDate: defines.today,
    }),
  },
  {
    label: "6M",
    range: () => ({
      startDate: subMonths(defines.today, 6),
      endDate: defines.today,
    }),
  },
  {
    label: "YTD",
    range: () => ({
      startDate: startOfYear(defines.today),
      endDate: defines.today,
    }),
  },
  {
    label: "1Y",
    range: () => ({
      startDate: subYears(defines.today, 1),
      endDate: defines.today,
    }),
  },
  {
    label: "5Y",
    range: () => ({
      startDate: subYears(defines.today, 5),
      endDate: defines.today,
    }),
  },
  {
    label: "MAX",
    range: () => ({
      startDate: subYears(defines.today, 5),
      endDate: defines.today,
    }),
  },
]);

export const defaultInputRanges = [
  {
    label: "days up to today",
    range(value) {
      console.log(value);
      return {
        startDate: subDays(defines.today, Math.max(Number(value), 1) - 1),
        endDate: defines.today,
      };
    },
    getCurrentValue(range) {
      console.log(range);
      // if (!isSameDay(range.endDate, defines.endOfToday)) return "-";
      if (!range.startDate) return "∞";
      return differenceInCalendarDays(defines.endOfToday, range.startDate) + 1;
    },
  },
  {
    label: "days starting from today (up to 7)",
    range(value) {
      const today = new Date();
      value = Math.min(Number(value), MAX_FORECAST_DAYS);
      return {
        startDate: today,
        endDate: addDays(today, Math.max(Number(value) - 1, 1)),
      };
    },
    getCurrentValue(range) {
      if (!isSameDay(range.startDate, defines.startOfToday)) return "-";
      if (differenceInCalendarDays(range.endDate, range.startDate) >= MAX_FORECAST_DAYS) return MAX_FORECAST_DAYS;
      if (!range.endDate) return "∞";
      return differenceInCalendarDays(range.endDate, defines.startOfToday) + 1;
    },
  },
];
