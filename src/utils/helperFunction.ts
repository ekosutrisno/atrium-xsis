import dayjs from "dayjs"

/**
 * @param  {any} value
 * @returns string
 */
export const formatDateFromNow = (value: any): string => {
   return dayjs(value).fromNow();
}

/**
 * @param  {any} value
 * @returns string
 */
export const formatDateWithMonth = (value: any): string => {
   return dayjs(value)
      .format('LL')
}
