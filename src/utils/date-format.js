/**
 * Форматирование даты
 * @param value {String} исходная дата
 * @param locale {String} код языка
 * @returns {String}
 */
export default function dateFormat(value, locale = 'ru') {
  const date = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
    day: 'numeric',
  }).format(new Date(value));
  const formattedDate = locale === 'ru' ? date.replace(' г.', '') : date;
  return formattedDate;
}
