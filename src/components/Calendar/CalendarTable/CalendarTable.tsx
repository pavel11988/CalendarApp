// mui components
import { Table, TableBody } from "@mui/material";

// helpers functions
import { getMonthData } from "../../../helpers/calendar";

// redux
import { useAppSelector } from "../../../hooks/redux";

// config
import CalendarItem from "../CalendarItem/CalendarItem";
import { Week } from "./CalendarTable.styled";

const CalendarTable = () => {
  const { notes, pickerMonth, pickerYear } = useAppSelector(
    (state) => state.calendarReducer
  );
  const monthData = getMonthData(pickerYear, pickerMonth);
  return (
    <Table>
      <TableBody>
        {monthData?.map((week, index) => (
          <Week key={index}>
            {week.map((date, index) => (
              <CalendarItem
                date={date}
                key={index}
                index={index}
                notes={notes}
              />
            ))}
          </Week>
        ))}
      </TableBody>
    </Table>
  );
};

export default CalendarTable;
