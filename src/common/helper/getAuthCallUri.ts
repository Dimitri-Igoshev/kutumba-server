import { getPhoneDigits } from "./getPhoneDigits"

export const getAuthCallUri = (phone: string): string => {
  if (!phone) return ''

  // return `${process.env.SMS_RU_CALL_URI}?phone=${getPhoneDigits(phone)}&ip=-1&api_id=${process.env.SMS_RU_API_ID}`
  return `${process.env.SMS_RU_CALL_URI}?phone=${getPhoneDigits(phone)}&ip=${process.env.SMS_RU_IP}&api_id=${process.env.SMS_RU_API_ID}`
}