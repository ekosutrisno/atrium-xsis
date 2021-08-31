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

/**
 * Get Year-Month format
 * @returns string
 */
export const currentMonth = (): string => {
   return `${dayjs().year()}-${dayjs().month() + 1}`
}

/**
 * To Check is Weekend
 * @returns boolean
 */
export const isWeekend = (date: any): boolean => {
   return dayjs(date).day() === 0 || dayjs(date).day() === 6
}

/**
 * To Check is Today Timesheet
 * @returns boolean
 */
export const isToday = (date: any): boolean => {
   return dayjs().date() === dayjs(date).date();
}
