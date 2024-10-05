import StoreModule from '../module';

/**
 * Категории
 */
class ProfileState extends StoreModule {
  initState() {
    return {
      profileData: { name: '' },
      waiting: false,
    };
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
}

export default ProfileState;
