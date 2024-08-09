'use client';

import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { ChevronLeft, ChevronRight, Loader, PlusCircle } from 'lucide-react';

import { debounce } from '@/utils';
import { genres } from '@/constants/movie';
import { useLazyGetMoviesQuery } from '@/state/services/movies';

import Loading from '@/components/loading';
import { Input } from '@/components/ui/input';
import MovieCard from '@/components/movie-card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Home() {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [genre, setGenre] = useState('');
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [getMovies, { isLoading: fetchingMovies, isFetching: isFetchingMovie }] = useLazyGetMoviesQuery({});

  useEffect(() => {
    getMovies({ page, searchTerm, genre }).then((res) => {
      setTotal(res.data.total);
      setMovies(res.data.items);
    });
  }, [getMovies, page, genre, searchTerm]);

  if (fetchingMovies) {
    return (
      <div className="text-center w-full h-[calc(94vh)] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  const debouncedSetSearchTerm = debounce<any>(setSearchTerm, 500);

  return (
    <div className="text-center w-full h-[calc(94vh)] px-10 py-20">
      <Head>
        <title>My page title</title>
      </Head>

      <div className="mb-6 flex flex-wrap gap-2 justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl">My movies</h1>

          <Link href="/app/add-movie">
            <PlusCircle size={24} className="cursor-pointer text-primary" />
          </Link>
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          {isFetchingMovie && (
            <div className="flex gap-1">
              <Loader size={14} className={'animate-spin text-primary'} />
              <span className="text-xs text-muted-foreground">Searching...</span>
            </div>
          )}

          <Button className="w-10" size="sm" variant="outline" disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
            <ChevronLeft />
          </Button>

          <p className="text-nowrap text-xs text-muted-foreground">
            {movies.length * (page + 1)} / {total}
          </p>

          <Button className="w-10" size="sm" variant="outline" disabled={movies.length * (page + 1) >= total} onClick={() => setPage((p) => p + 1)}>
            <ChevronRight />
          </Button>

          <Input
            className="w-full sm:w-60"
            placeholder="Search Movie"
            onChange={(e) => {
              debouncedSetSearchTerm(e.target.value);
            }}
          />

          <Select onValueChange={(v) => setGenre(v)} value={genre}>
            <SelectTrigger className="w-full sm:w-60">
              <SelectValue placeholder="Genre" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value={'_'}>All</SelectItem>

              {genres.map((genre) => (
                <SelectItem key={genre.value} value={genre.value}>
                  {genre.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

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
      )}
    </div>
  );
}
