import { styled } from '@mui/system'
import { Box, Button } from '@mui/material'

export const ButtonsContainer = styled(Box)`
    height: 80px;
    display: flex;
    justify-content: end;
    align-self: bottom;
`

export const SaveButton = styled(Button)`
    background-color: #03a9f4;
    color: #ffffff;
    width: 80px;
    height: 40px;
    margin-top: auto;

    &:disabled {
        background-color: #bdbdbd;
        color: #f5f5f5;
    }

    &:hover {
        background-color: #81d4fa;
        color: #e1f5fe;
    }
`
export const DeleteButton = styled(Button)`
    background-color: #b30909;
    color: #ffffff;
    width: 20px;
    height: 40px;
    margin-right: 10px;
    margin-top: auto;

    &:hover {
        background-color: #fa8181;
        color: #e1f5fe;
    }
`
