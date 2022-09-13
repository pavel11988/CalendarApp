import { Container } from '@mui/material'
import { useEffect } from 'react'
import Calendar from './components/Calendar/Calendar'
import ModalWindow from './components/ModalWindow/ModalWindow'
import { useAppDispatch } from './hooks/redux'
import { calendarSlice } from './redux/reducers/calendarSlice'

function App() {
    const { refresh } = calendarSlice.actions

    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(refresh())
    }, [dispatch, refresh])

    return (
        <Container>
            <Calendar />
            <ModalWindow />
        </Container>
    )
}

export default App
