import { api } from './api';

export const movieApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: () => ({ url: `movies/get-all` }),
      providesTags: ['Movies'],
    }),
    lookupMovies: builder.query({
      query: (title) => ({ url: `movies/lookup-movie?query=${title}` }),
      providesTags: ['Movies'],
    }),

    createMovie: builder.mutation({
      query: (movie) => ({
        url: `movies/create`,
        method: 'POST',
        body: movie,
      }),
      invalidatesTags: ['Movies'],
    }),
    updateMovie: builder.mutation({
      query: (movie) => ({
        url: `movies/update`,
        method: 'PUT',
        body: movie,
      }),
      invalidatesTags: ['Movies'],
    }),
    getPresignedURL: builder.mutation({
      query: (filename) => ({
        url: `movies/get-presigned-upload-url`,
        method: 'POST',
        body: { filename },
      }),
    }),
  }),
});

export const {
  // queries
  useGetMoviesQuery,
  useLazyLookupMoviesQuery,
  // mutations
  useCreateMovieMutation,
  useUpdateMovieMutation,
  useGetPresignedURLMutation,
} = movieApi;
