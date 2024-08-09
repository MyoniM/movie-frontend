import { api } from './api';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: '/auth/register-user',
        method: 'POST',
        body: credentials,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login-user',
        method: 'POST',
        body: credentials,
      }),
    }),
    fetchUser: builder.query({
      query: () => ({
        url: '/auth/current-user',
      }),
    }),
  }),
});

export const {
  // queries
  useFetchUserQuery,
  // mutations
  useLoginMutation,
  useRegisterMutation,
} = authApi;
