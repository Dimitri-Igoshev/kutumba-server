export const getPhoneDigits = (phone: string): string => {
  if (!phone) return ''

  return phone.replace(/\D/g, "")
}