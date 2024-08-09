import Cookies from 'js-cookie';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { RootState } from '../store';

import API_BASE from '../../config/index';

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE.API_URL,

  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token || Cookies.get('token');

    if (token) headers.set('Authorization', token);

    return headers;
  },
});

export const api = createApi({
  baseQuery,
  endpoints: () => ({}),
  tagTypes: ['Movies'],
});
