// icons
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { INote } from "../../../models/INote";
import {
  ButtonsContainer,
  DeleteButton,
  SaveButton,
} from "./ModalControllers.styled";

// date
import { default as dayjs } from "dayjs";

interface IProps {
  currentNote: INote | null;
  title: string;
  date: dayjs.Dayjs | null;
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
