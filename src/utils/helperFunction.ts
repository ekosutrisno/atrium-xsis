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

/**
 * @param  {number} hariMasuk
 * @returns string
 * This method to handle and calculate perfomance absent average
 */
export const calculatePerformaceAbsent = (hariMasuk: number): number => {
   let jumlahHariAktifSetahun = 365;
   let jumlahHariWeekend = 104;
   let hariKerja = jumlahHariAktifSetahun - jumlahHariWeekend;
   let percentage = (hariMasuk / hariKerja) * 100;
   return percentage;
}

/**
 * This method handle calculate penilaian user performance average
 * @param  {number} nilai
 * @param  {number} kompetensiPendukung
 * @param  {number} kedisiplinan 
 * @returns number
 */
export const calculatePerformacePenilaianUser = (nilai: {
   ski: number,
   kompetensiPendukung: number,
   kedisiplinan: number
}): number => {

   let totalNilaiInMonth = calculatePecentageNilaiUser(nilai.ski) +
      calculatePecentageNilaiUser(nilai.kompetensiPendukung) +
      calculatePecentageNilaiUser(nilai.kedisiplinan);

   let averageNilaiInMonth = totalNilaiInMonth / 3;

   return averageNilaiInMonth;
}

/**
 * This method to format display percentage with fix 3 digit coma
 * example output: 0.000%
 * @param  {number} num
 * @returns string
 */
export const toFixedFormat = (num: number): string => {
   return `${num.toFixed(3)}%`
}

/**
 * Only calculate percentage nilai per month
 * @param  {number} val
 * @returns number
 */
const calculatePecentageNilaiUser = (val: number): number => {
   let totalMaxNilaiPoint = 4;
   let totalMaxNilaiPointInYear = totalMaxNilaiPoint * 12;
   return (val / totalMaxNilaiPointInYear) * 100;
}