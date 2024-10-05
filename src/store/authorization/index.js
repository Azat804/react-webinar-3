import StoreModule from '../module';

/**
 * Страница авторизации
 */
class AuthorizationState extends StoreModule {
  initState() {
    return {
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
      console.log(response, json);
      if (response.status !== 200) {
        throw new Error(json.error.data.issues[0].message);
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
      this.setState({ ...this.getState(), token: '', waiting: false }, 'Сброшена авторизация');
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
