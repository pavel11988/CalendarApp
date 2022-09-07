import { Container } from "@mui/material";
import Calendar from "./components/Calendar/Calendar";
import ModalWindow from "./components/ModalWindow/ModalWindow";
import { useAppSelector } from "./hooks/redux";

function App() {
  const { currentNote } = useAppSelector((state) => state.calendarReducer);
  return (
    <Container>
      <Calendar />
      <ModalWindow currentNote={currentNote} />
    </Container>
  );
}

export default App;
