import { styled } from '@mui/system'

import { Button } from '@mui/material'

export const AddBtn = styled(Button)`
    background-color: #4db6ac;
    border-radius: 50%;
    max-width: 40px;
    max-height: 40px;
    min-width: 40px;
    min-height: 40px;
    color: #ffffff;
    box-shadow: 0px 3px 10px 1px #0000005e;
    &:hover {
        box-shadow: none;
        background-color: #80cbc4;
    }
`
