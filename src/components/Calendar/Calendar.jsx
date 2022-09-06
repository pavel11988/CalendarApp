// components
import Controllers from "./Controllers/Controllers";
import CalendarTable from "./CalendarTable/CalendarTable";

// mui components
import { Container } from "@mui/material";

const Calendar = () => {
  return (
    <Container>
      <Controllers />
      <CalendarTable />
    </Container>
  );
};

export default Calendar;
