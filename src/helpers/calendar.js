import moment from "moment";

const DAYS_IN_WEEK = 7;

function getDayOfWeek(date) {
  const dayOfWeek = date.getDay();
  if (dayOfWeek === 0) return 6;
  return dayOfWeek - 1;
}

export function getMonthData(year, month) {
  const result = [];
  const date = new Date(year, month);
  let day = 1;

  const daysInCurrentMonth = moment(
    `${year}-${month + 1}`,
    "YYYY-MM"
  ).daysInMonth();

  // const prevMonth = month === 0 ? 11 : month - 1;
  // const prevYear = month === 0 ? year - 1 : year;
  // const daysInPrevMonth = moment(
  //   `${prevYear}-${prevMonth}`,
  //   "YYYY-MM"
  // ).daysInMonth();

  // console.log("current:", year, month);
  // console.log("prev:", prevMonth, prevYear);

  const monthStartsOn = getDayOfWeek(date);

  for (
    let i = 0;
    i < (daysInCurrentMonth + monthStartsOn) / DAYS_IN_WEEK;
    i++
  ) {
    result[i] = [];
    for (let j = 0; j < DAYS_IN_WEEK; j++) {
      if ((i === 0 && j < monthStartsOn) || day > daysInCurrentMonth) {
        result[i][j] = undefined;
      } else {
        result[i][j] = new Date(year, month, day++);
      }
    }
  }

  return result;
}
