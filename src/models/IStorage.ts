import { INote } from './INote'

interface IResponse {
    notes: INote[]
    pickerMonth: number
    pickerYear: number
}

type loadFunc = () => IResponse

type saveFunc = (
    notes: INote[],
    pickerMonth: number,
    pickerYear: number,
    actionType?: string
) => IResponse

export interface IStorage {
    load: loadFunc
    save: saveFunc
}
