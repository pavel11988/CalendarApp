// components
import Controllers from "./Controllers/Controllers";
import CalendarTable from "./CalendarTable/CalendarTable";

// mui components
import { Container } from "@mui/material";
import AddButton from "./AddButton/AddButton";

// styled components
import { CalendarHeader } from "./Calendar.styled";

const Calendar = () => {
  return (
    <Container>
      <CalendarHeader>
        <AddButton />
        <Controllers />
      </CalendarHeader>
      <CalendarTable />
    </Container>
  );
};

export default Calendar;
