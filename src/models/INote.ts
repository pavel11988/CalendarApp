import * as dayjs from "dayjs";

export interface INote {
  id: string;
  date: dayjs.Dayjs | null;
  title: string;
  description: string;
  createdAt: dayjs.Dayjs;
  updatedAt: dayjs.Dayjs | null;
}
