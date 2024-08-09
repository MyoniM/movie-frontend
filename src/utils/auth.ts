import Cookies from 'js-cookie';

import { store } from '../state/store';
import { authApi } from '../state/services/auth';
import { logOut, setCredentials } from '../state/features/auth/authSlice';

export async function fetchUser() {
  const token = Cookies.get('token');

  if (token) {
    try {
      const { data, isError } = await store.dispatch(authApi.endpoints.fetchUser.initiate({}));

      if (data) store.dispatch(setCredentials({ ...data, token }));

      if (isError) store.dispatch(logOut());
    } catch (error) {
      store.dispatch(logOut());
    }
  } else {
    store.dispatch(logOut());
  }
}
