// Начальное состояние
export const initialState = {
  sentComment: {},
  data: {},
  waiting: false, // признак ожидания загрузки
  error: {},
  commentsCache: [],
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comment/load-start':
      return { ...state, data: {}, sentComment: {}, waiting: true, commentsCache: [] };

    case 'comment/load-success':
      return {
        ...state,
        data: action.payload.data,
        sentComment: {},
        waiting: false,
        commentsCache: [],
      };

    case 'comment/load-error':
      return {
        ...state,
        data: {},
        sentComment: {},
        waiting: false,
        error: action.payload.error,
        commentsCache: [],
      }; //@todo текст ошибки сохранять?
    case 'comment/add-start':
      return { ...state, sentComment: {}, waiting: true };

    case 'comment/add-success':
      console.log('abcder', action.payload.data);
      return { ...state, sentComment: action.payload.data, waiting: false };

    case 'comment/add-error':
      return { ...state, sentComment: {}, waiting: false, error: action.payload.error }; //@todo текст ошибки сохранять?
    case 'comment/add-comment':
      return { ...state, commentsCache: action.payload.data };
    case 'comment/delete-comment':
      return { ...state, sentComment: {} };

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
