// mui components
import { Table, TableBody, TableCell, TableRow } from "@mui/material";

// helpers functions
import { getMonthData } from "../../../helpers/calendar";

// redux
import { useAppSelector } from "../../../hooks/redux";

// config
import { daysOfWeek } from "../../../helpers/config-data";

const tableStyled = {
  row: {
    height: "130px",
    width: "130px",
    backgroundColor: "#e8f5e9",
  },
  cell: {
    border: "1px solid #78909c",
  },
};

const CalendarTable = () => {
  const { pickerMonth, pickerYear } = useAppSelector(
    (state) => state.calendarReducer
  );
  const monthData = getMonthData(pickerYear, pickerMonth);
  return (
    <Table>
      <TableBody>
        {monthData?.map((week, index) => (
          <TableRow sx={tableStyled.row} component="tr" key={index}>
            {week.map((date, index) => {
              if (date) {
                return (
                  <TableCell sx={tableStyled.cell} key={index}>
                    {date.getDate()}
                    <p>{daysOfWeek[index]}</p>
                  </TableCell>
                );
              } else {
                return <TableCell sx={tableStyled.cell} key={index} />;
              }
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CalendarTable;
