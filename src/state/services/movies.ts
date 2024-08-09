import { api } from './api';

export const movieApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: ({ page, searchTerm, genre }) => ({ url: `movies/get-all?offset=${page}&query=${searchTerm}&genre=${genre}` }),
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
  useLazyGetMoviesQuery,
  useLazyLookupMoviesQuery,
  // mutations
  useCreateMovieMutation,
  useUpdateMovieMutation,
  useGetPresignedURLMutation,
} = movieApi;
