// mui components
import { Table, TableBody, TableRow } from "@mui/material";

// helpers functions
import { getMonthData } from "../../../helpers/calendar";

// redux
import { useAppSelector } from "../../../hooks/redux";

// config
import CalendarItem from "../CalendarItem/CalendarItem";

const tableStyles = {
  row: {
    height: "130px",
    backgroundColor: "#e8f5e9b6",
  },
};

const CalendarTable = () => {
  const { notes, pickerMonth, pickerYear } = useAppSelector(
    (state) => state.calendarReducer
  );
  const monthData = getMonthData(pickerYear, pickerMonth);
  return (
    <Table>
      <TableBody>
        {monthData?.map((week, index) => (
          <TableRow sx={tableStyles.row} component="tr" key={index}>
            {week.map((date, index) => (
              <CalendarItem
                date={date}
                key={index}
                index={index}
                notes={notes}
              />
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CalendarTable;
