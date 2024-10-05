import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

/**
 * Хук для проверки авторизации пользователя
 * @param token {String} токен
 * @param redirectError {String} адрес, на который будет перенаправлен неавторизованный пользователь
 * * @param redirectSuccess {String} адрес, на который будет перенаправлен авторизованный пользователь
 */
export default function useAuthorization(
  token,
  redirectSuccess = '/profile',
  redirectError = '/login',
) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate(redirectError);
    } else {
      navigate(redirectSuccess);
    }
  }, [token]);
}
