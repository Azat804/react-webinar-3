class I18nService {
  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   */
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this.state = { locale: this.config.locale };
  }

  /**
   * Установка кода языка и установка заголовка в сервисе API
   * @param locale {String} Код языка
   */
  translate(locale = null) {
    this.state = { ...this.state, locale: locale ? locale : this.state.locale };
    this.services.api.setHeader('Accept-Language', this.state.locale);
  }
}

export default I18nService;
