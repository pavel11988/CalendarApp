// mui components
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TableCell,
} from "@mui/material";

// redux
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { calendarSlice } from "../../../redux/reducers/calendarSlice";
import { globalSlice } from "../../../redux/reducers/globalSlice";

// icons
import EventNoteIcon from "@mui/icons-material/EventNote";

const itemStyles = {
  cell: {
    width: "120px",
    border: "1px solid #78909c",
    padding: "2px",
    position: "relative",
  },
  cellToday: {
    width: "120px",
    border: "1px solid #78909c",
    backgroundColor: "#8aff80b6",
    padding: "2px",
    position: "relative",
  },
  cellAnother: {
    width: "120px",
    border: "1px solid #78909c",
    backgroundColor: "#b8b8b8",
    padding: "2px",
    opacity: 0.5,
    position: "relative",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    position: "absolute",
    top: 3,
  },
  info: {
    width: "40px",
  },
  list: {
    mt: "20px",
    overflow: "auto",
    minHeight: 100,
    maxHeight: 100,
    maxWidth: 120,
    ml: "auto",
    mr: "auto",
  },
  noteButton: {
    overflow: "hidden",
    pt: "2px",
    pb: "2px",
    pl: "1px",
    color: "#616161",
  },
};

const daysOfWeek = {
  0: "Mon",
  1: "Tue",
  2: "Wed",
  3: "Thu",
  4: "Fri",
  5: "Sat",
  6: "Sun",
};

const CalendarItem = ({ date, index, notes }) => {
  const today = new Date();

  const { changeEditNote } = calendarSlice.actions;
  const { toggleModal } = globalSlice.actions;
  const { pickerMonth } = useAppSelector((state) => state.calendarReducer);
  const dispatch = useAppDispatch();

  const handleEditNote = async (note) => {
    await dispatch(changeEditNote(note));
    dispatch(toggleModal(true));
  };

  const currentDay =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
  const anotherMonth = date.getMonth() !== pickerMonth;

  return (
    <TableCell
      sx={
        (currentDay && !anotherMonth && itemStyles.cellToday) ||
        (!currentDay && !anotherMonth && itemStyles.cell) ||
        (!currentDay && anotherMonth && itemStyles.cellAnother)
      }
    >
      <Box sx={itemStyles.container}>
        <Box sx={itemStyles.info}>{date.getDate()}</Box>
        <Box sx={itemStyles.info}>{daysOfWeek[index]}</Box>
      </Box>

      <List sx={itemStyles.list}>
        {notes.map(
          (note) =>
            note.date.toString() === date.toString() && (
              <ListItem sx={itemStyles.container} key={note.id} disablePadding>
                <ListItemButton
                  sx={itemStyles.noteButton}
                  onClick={() => handleEditNote(note)}
                >
                  <EventNoteIcon />
                  <ListItemText primary={note.title} />
                </ListItemButton>
              </ListItem>
            )
        )}
      </List>
    </TableCell>
  );
};

export default CalendarItem;
