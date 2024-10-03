import StoreModule from '../module';

/**
 * Страница авторизации
 */
class AuthorizationState extends StoreModule {
  initState() {
    return {
      profileData: { name: '' },
      waiting: false, // признак ожидания загрузки
      token: '',
      errorData: '',
    };
  }

  /**
   * Получение токена по введеным данным от пользователя
   * @param login {String}
   * @param password {String}
   * @return {Promise<void>}
   */
  async getToken(login, password) {
    // Установка признака ожидания загрузки
    this.setState({
      waiting: true,
    });

    try {
      if (!login || !password) {
        throw new Error('Не все поля формы заполнены');
      }
      const response = await fetch(`/api/v1/users/sign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          login: login,
          password: password,
        }),
      });
      const json = await response.json();
      if (response.status !== 200) {
        throw new Error(json.error.message);
      }

      localStorage.setItem('token', json.result.token);

      // Токен загружен успешно
      this.setState(
        { ...this.getState(), errorData: '', token: json.result.token, waiting: false },
        'Загружен токен из АПИ',
      );
    } catch (e) {
      // Ошибка при загрузке
      // @todo В стейт можно положить информацию об ошибке
      this.setState({ ...this.getState(), waiting: false, errorData: e.message });
    }
  }

  /**
   * Получение данных о профиле пользователя по токену
   * @param token {String}
   * @return {Promise<void>}
   */
  async getProfile(token) {
    // Установка признака ожидания загрузки
    this.setState({
      waiting: true,
    });
    const tkn = token ? token : '';
    try {
      const response = await fetch(`/api/v1/users/self?fields=*`, {
        method: 'GET',
        headers: { 'X-token': tkn, 'Content-Type': 'application/json' },
      });
      const json = await response.json();
      // Профиль загружен успешно
      this.setState(
        {
          ...this.getState(),
          profileData: { ...json.result, ...json.result.profile },
          waiting: false,
        },
        'Загружен профиль из АПИ',
      );
    } catch (e) {
      // Ошибка при загрузке
      // @todo В стейт можно положить информацию об ошибке
      this.setState({
        waiting: false,
      });
    }
  }

  /**
   * Сброс авторизации
   * @return {Promise<void>}
   */
  async deleteToken() {
    // Установка признака ожидания загрузки
    this.setState({
      waiting: true,
    });
    const tkn = localStorage.getItem('token');
    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: 'DELETE',
        headers: { 'X-token': tkn, 'Content-Type': 'application/json' },
      });
      const json = await response.json();
      localStorage.removeItem('token');
      // Авторизация сброшена успешно
      this.setState(
        { ...this.getState(), profileData: { name: '' }, token: '', waiting: false },
        'Сброшена авторизация',
      );
    } catch (e) {
      // Ошибка при загрузке
      // @todo В стейт можно положить информацию об ошибке
      this.setState({
        waiting: false,
      });
    }
  }
}

export default AuthorizationState;
