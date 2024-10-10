// Начальное состояние
export const initialState = {
  sentComment: {},
  data: [],
  waiting: false, // признак ожидания загрузки
  error: {},
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comment/load-start':
      return { ...state, data: [], waiting: true };

    case 'comment/load-success':
      return { ...state, data: action.payload.data, waiting: false };

    case 'comment/load-error':
      return { ...state, data: [], waiting: false, error: action.payload.error }; //@todo текст ошибки сохранять?
    case 'comment/add-start':
      return { ...state, sentComment: {}, waiting: true };

    case 'comment/add-success':
      return { ...state, sentComment: action.payload.data, waiting: false };

    case 'comment/add-error':
      return { ...state, sentComment: {}, waiting: false, error: action.payload.error }; //@todo текст ошибки сохранять?

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
