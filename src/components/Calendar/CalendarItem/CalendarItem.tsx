// redux
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { calendarSlice } from '../../../redux/reducers/calendarSlice'
import { globalSlice } from '../../../redux/reducers/globalSlice'

// icons
import EventNoteIcon from '@mui/icons-material/EventNote'

// styled components
import {
    CalendarCell,
    DayInfo,
    DayInfoContainer,
    NotesList,
    NoteItem,
    NoteButton,
    NoteTitle,
} from './CalendarItem.styled'

// libs
import { default as dayjs } from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { INote } from '../../../models/INote'

interface IDays {
    [key: number]: string
}
const daysOfWeek: IDays = {
    0: 'Mon',
    1: 'Tue',
    2: 'Wed',
    3: 'Thu',
    4: 'Fri',
    5: 'Sat',
    6: 'Sun',
}

interface IProps {
    date: Date
    index: number
    notes: INote[]
}

const CalendarItem = ({ date, index, notes }: IProps) => {
    const today = new Date()

    const { changeEditNote } = calendarSlice.actions
    const { toggleModal } = globalSlice.actions
    const { pickerMonth } = useAppSelector((state) => state.calendarReducer)
    const dispatch = useAppDispatch()

    const handleEditNote = async (note: INote) => {
        await dispatch(changeEditNote(note))
        dispatch(toggleModal(true))
    }

    const currentDay =
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    const anotherMonth = date.getMonth() !== pickerMonth

    const todayCell = currentDay && !anotherMonth
    const standartCell = !currentDay && !anotherMonth
    const anotherCell = !currentDay && anotherMonth

    return (
        <CalendarCell
            color={
                (todayCell && 'todayCell') ||
                (standartCell && 'standartCell') ||
                (anotherCell && 'anotherCell') ||
                ''
            }
        >
            <DayInfoContainer>
                <DayInfo>{date.getDate()}</DayInfo>
                <DayInfo>{daysOfWeek[index]}</DayInfo>
            </DayInfoContainer>

            <NotesList>
                {notes.map((note) => {
                    dayjs.extend(utc)
                    return (
                        note.date?.toString().split('T')[0] ===
                            dayjs
                                .utc(date)
                                .format()
                                .toString()
                                .split('T')[0] && (
                            <NoteItem key={note.id} disablePadding>
                                <NoteButton
                                    onClick={() => handleEditNote(note)}
                                >
                                    <EventNoteIcon />
                                    <NoteTitle primary={note.title} />
                                </NoteButton>
                            </NoteItem>
                        )
                    )
                })}
            </NotesList>
        </CalendarCell>
    )
}

export default CalendarItem
