// mui components
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TableCell,
} from "@mui/material";

// icons
import EventNoteIcon from "@mui/icons-material/EventNote";

// config
import { daysOfWeek } from "../../../helpers/config-data";
// import { useAppSelector } from "../../../hooks/redux";

const itemStyles = {
  cell: {
    width: "120px",
    border: "1px solid #78909c",
    padding: "3px",
    position: "relative",
  },
  cellToday: {
    width: "120px",
    border: "1px solid #78909c",
    backgroundColor: "#8aff80b6",
    padding: "3px",
    position: "relative",
  },
  cellAnother: {
    width: "120px",
    border: "1px solid #78909c",
    backgroundColor: "#b8b8b873",
    padding: "3px",
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
    maxHeight: 100,
  },
};

const CalendarItem = ({ date, index, notes }) => {
  const today = new Date();

  if (date) {
    return (
      <TableCell
        sx={
          date.getDate() === today.getDate()
            ? itemStyles.cellToday
            : itemStyles.cell
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
                <ListItem sx={itemStyles.note} key={note.id} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <EventNoteIcon />
                    </ListItemIcon>
                    <ListItemText primary={note.title} />
                  </ListItemButton>
                </ListItem>
              )
          )}
        </List>
      </TableCell>
    );
  } else {
    return <TableCell sx={itemStyles.cellAnother} />;
  }
};

export default CalendarItem;
