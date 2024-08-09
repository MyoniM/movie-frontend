'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { PlusCircle } from 'lucide-react';

import Loading from '@/components/loading';
import MovieCard from '@/components/movie-card';
import { Button } from '@/components/ui/button';

import { useGetMoviesQuery } from '@/state/services/movies';
import Head from 'next/head';

export default function Home() {
  const router = useRouter();
  const { data, isLoading: fetchingMovies } = useGetMoviesQuery({});

  if (fetchingMovies) {
    return (
      <div className="text-center w-full h-[calc(94vh)] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  const movies = data || [];

  return (
    <div className="text-center w-full h-[calc(94vh)] p-10 md:p-20">
      <Head>
        <title>My page title</title>
      </Head>

      {movies.length === 0 && (
        <div className="h-full w-full flex items-center justify-center">
          <div>
            <Loading />

            <h1 className="text-5xl mb-6">Your movie list is empty</h1>

            <Link href="/app/add-movie">
              <Button>Add a new movie</Button>
            </Link>
          </div>
        </div>
      )}

      {movies.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-6">
            <h1 className="text-2xl ">My movies</h1>

            <Link href="/app/add-movie">
              <PlusCircle size={24} className="cursor-pointer text-primary" />
            </Link>
          </div>

          <div className="flex gap-4 flex-wrap">
            {movies.map((movie: any, i: number) => (
              <MovieCard
                key={i}
                {...{
                  Year: movie.year,
                  Title: movie.title,
                  Rated: movie.rated,
                  Genre: movie.genre,
                  Poster: movie.poster,
                  imdbRating: movie.imdbRating,
                }}
                onSuggestionClick={() => {
                  let posterKey = movie.poster.split('https://yoni-staging.s3.us-east-1.amazonaws.com/').pop();
                  posterKey = posterKey?.split('?X')[0];

                  const poster = encodeURIComponent(movie.poster);
                  const query = `?movie=${movie.id}&title=${movie.title}&year=${movie.year}&genre=${movie.genre}&rated=${movie.rated}&imdbRating=${movie.imdbRating}&posterKey=${posterKey}&poster=${poster}`;
                  router.push('/app/add-movie' + query);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
