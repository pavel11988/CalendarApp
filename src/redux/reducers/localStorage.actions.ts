import { INote } from '../../models/INote'

const localStorage = {
    load: () => {
        const notes = window.localStorage.getItem(`notes`)
        const pickerMonth = window.localStorage.getItem(`pickerMonth`)
        const pickerYear = window.localStorage.getItem(`pickerYear`)

        const parsedNotes = notes === null ? [] : JSON.parse(notes)
        const parsedPickerMonth =
            pickerMonth === null
                ? new Date().getMonth()
                : JSON.parse(pickerMonth)
        const parsedPickerYear =
            pickerYear === null
                ? new Date().getFullYear()
                : JSON.parse(pickerYear)

        const response = {
            notes: parsedNotes,
            pickerMonth: parsedPickerMonth,
            pickerYear: parsedPickerYear,
        }

        return response
    },
    save: (
        notes: INote[],
        pickerMonth: number,
        pickerYear: number,
        actionType?: string
    ) => {
        window.localStorage.setItem(`notes`, JSON.stringify(notes))
        window.localStorage.setItem(`pickerMonth`, JSON.stringify(pickerMonth))
        window.localStorage.setItem(`pickerYear`, JSON.stringify(pickerYear))

        const newNotes = window.localStorage.getItem(`notes`)
        const newPickerMonth = window.localStorage.getItem(`pickerMonth`)
        const newPickerYear = window.localStorage.getItem(`pickerYear`)

        const response = {
            notes: newNotes ? JSON.parse(newNotes) : [],
            pickerMonth: newPickerMonth
                ? JSON.parse(newPickerMonth)
                : new Date().getMonth(),
            pickerYear: newPickerYear
                ? JSON.parse(newPickerYear)
                : new Date().getFullYear(),
        }

        return response
    },
}

export default localStorage
