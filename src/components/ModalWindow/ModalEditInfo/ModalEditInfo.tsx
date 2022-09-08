// mui components
import { Typography } from "@mui/material";
// interfaces
import { INote } from "../../../models/INote";
// styled components
import { EditInfoContainer } from "./ModalEditInfo.styled";

interface IProps {
  currentNote: INote;
}

const ModalEditInfo = ({ currentNote }: IProps) => (
  <EditInfoContainer>
    <Typography component="p">
      Created at: {currentNote.createdAt.split("T")[0]}{" "}
      {currentNote.createdAt.split("T")[1].split(".")[0]}
    </Typography>
    <Typography component="p">
      Updated at: {currentNote.updatedAt.split("T")[0]}{" "}
      {currentNote.updatedAt.split("T")[1].split(".")[0]}
    </Typography>
  </EditInfoContainer>
);

export default ModalEditInfo;
