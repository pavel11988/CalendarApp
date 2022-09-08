// icons
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { INote } from "../../../models/INote";
import {
  ButtonsContainer,
  DeleteButton,
  SaveButton,
} from "./ModalControllers.styled";

interface IProps {
  currentNote: INote;
  title: string;
  date: string;
  handleDelete: Function;
  handleSubmit: Function;
  error: boolean;
}

const ModalControllers = ({
  currentNote,
  title,
  date,
  handleDelete,
  handleSubmit,
  error,
}: IProps) => {
  // sx={controllersStyles.buttonsContainer}
  return (
    <ButtonsContainer>
      {currentNote && (
        <DeleteButton onClick={(e) => handleDelete(e)}>
          <DeleteForeverIcon />
        </DeleteButton>
      )}
      <SaveButton
        disabled={title.trim() === "" || date === null || error === true}
        onClick={() => handleSubmit()}
      >
        Save
      </SaveButton>
    </ButtonsContainer>
  );
};

export default ModalControllers;
