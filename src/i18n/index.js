class I18nService {
  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   */
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this.locale = this.config.locale;
  }

  /**
   * Установка кода языка и установка заголовка в сервисе API
   * @param locale {String} Код языка
   */
  translate(locale = null) {
    if (locale) {
      this.locale = locale;
    }
    this.services.api.setHeader('Accept-Language', this.locale);
  }
}

export default I18nService;
