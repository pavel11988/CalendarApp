// components
import Controllers from "./Controllers/Controllers";
import CalendarTable from "./CalendarTable/CalendarTable";

// mui components
import { Box, Container } from "@mui/material";
import AddButton from "./AddButton/AddButton";

const styles = {
  headerBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};

const Calendar = () => {
  return (
    <Container>
      <Box sx={styles.headerBox}>
        <AddButton />
        <Controllers />
      </Box>
      <CalendarTable />
    </Container>
  );
};

export default Calendar;
