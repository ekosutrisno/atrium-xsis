import dayjs from "dayjs"


export const formatDateFromNow = (value: any): string => {
   return dayjs(value).fromNow();
}

export const formatDateWithMonth = (value: any) => {
   return dayjs(value)
      .format('LL')
}
