// mui components
import { Button } from "@mui/material";

// icon
import CloseIcon from "@mui/icons-material/Close";

const modalStyles = {
  closeButton: {
    position: "absolute",
    top: 15,
    right: 20,
    maxWidth: "30px",
    maxHeight: "30px",
    minWidth: "30px",
    minHeight: "30px",
    color: "#9e9e9e",
    borderRadius: "50%",
    "&:hover": {
      backgroundColor: "#616161",
      color: "#eeeeee",
    },
  },
};

interface IProps {
  handleClose: Function;
}

const ModalCloseButton = ({ handleClose }: IProps) => {
  return (
    <Button sx={modalStyles.closeButton} onClick={() => handleClose()}>
      <CloseIcon />
    </Button>
  );
};

export default ModalCloseButton;
