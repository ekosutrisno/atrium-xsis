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
 * @param  {any} value
 * @returns string
 */
export const formatDateWithDayMonth = (value: any): string => {
   return dayjs(value)
      .format('dddd, MMMM D, YYYY')
}

/**
 * Get Year-Month format
 * @returns string
 */
export const currentMonth = (): string => {
   return `${dayjs().year()}-${dayjs().month() + 1}`
}

/**
 * Get Month format
 * @returns string
 */
export const currentMonthOnly = (): string => {
   return `${dayjs().month() + 1}`
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
   return dayjs().format('l') === dayjs(date).format('l');
}

/**
 * To return current Month And Year only
 * @returns string
 */
export const currentMonthAndYear = (date: any): string => {
   return dayjs(date).format('MMMM YYYY')
}

export const calculatePerformaceAbsent = (hariMasuk: number): string => {
   let jumlahHariAktifSetahun = 365;
   let jumlahHariWeekend = 104;
   let hariKerja = jumlahHariAktifSetahun - jumlahHariWeekend;
   let percentage = (hariMasuk / hariKerja) * 100;
   return `${percentage.toFixed(3).toString()}%`;
}