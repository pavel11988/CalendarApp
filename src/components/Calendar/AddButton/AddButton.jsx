import { Button } from "@mui/material";
import { globalSlice } from "../../../redux/reducers/globalSlice";
import { useAppDispatch } from "../../../hooks/redux";

const addButtonStyles = {
  button: {
    backgroundColor: "#4db6ac",
    borderRadius: "50%",
    maxWidth: "40px",
    maxHeight: "40px",
    minWidth: "40px",
    minHeight: "40px",
    color: "#ffffff",
    boxShadow: "0px 3px 10px 1px #0000005e",
    "&:hover": {
      boxShadow: "none",
      backgroundColor: "#80cbc4",
    },
  },
};

const AddButton = () => {
  const { toggleModal } = globalSlice.actions;
  const dispatch = useAppDispatch();

  return (
    <Button
      onClick={() => dispatch(toggleModal(true))}
      sx={addButtonStyles.button}
    >
      +
    </Button>
  );
};

export default AddButton;
