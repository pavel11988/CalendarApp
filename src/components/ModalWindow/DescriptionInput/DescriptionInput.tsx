import { TextField } from '@mui/material'

interface IProps {
    description: string
    setDescription: Function
}

const DescriptionInput = ({ description, setDescription }: IProps) => {
    return (
        <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={7}
            variant="standard"
        />
    )
}

export default DescriptionInput
