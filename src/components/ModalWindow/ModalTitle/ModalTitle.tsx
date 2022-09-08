// mui components
import { Typography } from "@mui/material";
// interfaces
import { INote } from "../../../models/INote";

interface IProps {
  currentNote: INote | null;
}

const ModalTitle = ({ currentNote }: IProps) => {
  return (
    <Typography variant="h6" component="h2">
      {currentNote ? "Edit idea item" : "Add new idea item"}
    </Typography>
  );
};

export default ModalTitle;
