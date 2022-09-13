// mui components
import { Input, InputAdornment } from '@mui/material'

// icons
import RecentActorsIcon from '@mui/icons-material/RecentActors'

interface IProps {
    title: string
    setTitle: Function
}

const TitleInput = ({ title, setTitle }: IProps) => {
    return (
        <Input
            sx={{ mb: '15px' }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title goes here"
            endAdornment={
                <InputAdornment position="start">
                    <RecentActorsIcon />
                </InputAdornment>
            }
        />
    )
}

export default TitleInput
