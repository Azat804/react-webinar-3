export default {
  /**
   * Загрузка комментариев
   * @param id
   * @return {Function}
   */
  load: id => {
    return async (dispatch, getState, services) => {
      // Сброс массива комментариев и установка признака ожидания загрузки
      dispatch({ type: 'comment/load-start' });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });
        // Массив комментариев загружен успешно
        dispatch({ type: 'comment/load-success', payload: { data: res.data.result } });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'comment/load-error', payload: { error: e } });
      }
    };
  },

  /**
   * Отправка комментария
   * @param data
   * @return {Function}
   */
  sendComment: data => {
    return async (dispatch, getState, services) => {
      // Сброс текущего комментария и установка признака ожидания отправки
      dispatch({ type: 'comment/add-start' });

      try {
        const res = await services.api.request({
          url: '/api/v1/comments',
          method: 'POST',
          body: JSON.stringify(data),
        });
        // Комментарий отправлен успешно
        dispatch({ type: 'comment/add-success', payload: { data } });
      } catch (e) {
        //Ошибка отправки
        dispatch({ type: 'comment/add-error', payload: { error: e } });
      }
    };
  },
};
