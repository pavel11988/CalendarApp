import { styled } from "@mui/system";
import { Box, FormControl } from "@mui/material";

export const ModalContainer = styled(Box)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  height: 500px;
  background-color: white;
  padding: 16px;
  border-radius: 15px;
`;

export const ModalForm = styled(FormControl)`
  margin-top: 15px;
  width: 100%;
`;
