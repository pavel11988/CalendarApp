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

  const prevMonth = month === 1 ? 12 : month - 1;
  const prevYear = month === 1 ? year - 1 : year;
  const daysInPrevMonth = moment(
    `${prevYear}-${prevMonth}`,
    "YYYY-MM"
  ).daysInMonth();

  const monthStartsOn = getDayOfWeek(date);

  for (
    let i = 0;
    i < (daysInCurrentMonth + monthStartsOn) / DAYS_IN_WEEK;
    i++
  ) {
    result[i] = [];
    for (let j = 0; j < DAYS_IN_WEEK; j++) {
      if (i === 0 && j < monthStartsOn) {
        let p = daysInPrevMonth - monthStartsOn;
        for (let j = 0; j < monthStartsOn; j++) {
          p += 1;
          result[i][j] = new Date(prevYear, prevMonth, p);
        }
      } else {
        result[i][j] = new Date(year, month, day++);
      }
    }
  }

  return result;
}
