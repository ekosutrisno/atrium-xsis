import dayjs from "dayjs"


export const formatDateFromNow = (value: any): string => {
   return dayjs(value).fromNow();
}
