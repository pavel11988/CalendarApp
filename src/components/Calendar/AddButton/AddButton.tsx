// redux
import { globalSlice } from "../../../redux/reducers/globalSlice";
import { useAppDispatch } from "../../../hooks/redux";

// icons
import AddIcon from "@mui/icons-material/Add";

// styled-components
import { AddBtn } from "./AddButton.styled";

const AddButton = () => {
  const { toggleModal } = globalSlice.actions;
  const dispatch = useAppDispatch();

  return (
    <AddBtn onClick={() => dispatch(toggleModal(true))}>
      <AddIcon />
    </AddBtn>
  );
};

export default AddButton;
