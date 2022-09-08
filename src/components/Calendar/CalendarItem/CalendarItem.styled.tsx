import { styled } from "@mui/system";

// mui components
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TableCell,
} from "@mui/material";

export const CalendarCell = styled(TableCell)`
  width: 120px;
  border: 1px solid #78909c;
  padding: 2px;
  position: relative;
  background-color: ${(props) => {
    if (props.color === "todayCell") return "#8aff80b6";
    if (props.color === "standartCell") return "#f5f5f5";
    if (props.color === "anotherCell") return "#b8b8b8";
  }};
`;

export const DayInfoContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: absolute;
  top: 3;
`;

export const DayInfo = styled(Box)`
  width: 40px;
`;

export const NotesList = styled(List)`
  margin-top: 20px;
  overflow: auto;
  min-height: 100px;
  max-height: 100px;
  max-width: 120px;
  margin-left: auto;
  margin-right: auto;
`;

export const NoteItem = styled(ListItem)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: absolute;
  top: 3;
`;

export const NoteButton = styled(ListItemButton)`
  overflow: hidden;
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: 1px;
  color: #616161;
`;

export const NoteTitle = styled(ListItemText)``;
