'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { format, set } from 'date-fns';
import { useForm } from 'react-hook-form';
import { CalendarIcon, Loader } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';

import { cn } from '@/lib/utils';
import { debounce } from '@/utils';
import { urlToFile } from '@/utils/image';
import { genres, ratings } from '@/constants/movie';
import { useCreateMovieMutation, useGetPresignedURLMutation, useLazyLookupMoviesQuery, useUpdateMovieMutation } from '@/state/services/movies';

import Rating from '@/components/rating';
import Loading from '@/components/loading';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import FileUpload from '@/components/file-upload';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/components/ui/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import MovieCard, { MovieProps } from '@/components/movie-card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const movieSchema = z.object({
  year: z.date({ required_error: 'Year is required' }),
  title: z.string().min(1, { message: 'Title is required' }),
});

export default function AddMovie() {
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();

  const [term, setTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSUggestions] = useState([]);
  const [imageSrc, setImageSrc] = useState<File | null>(null);
  const [rating, setRating] = useState(Number(searchParams.get('imdbRating') || 0));
  const [selectedRating, setSelectedRating] = useState(searchParams.get('rated') || 'G');
  const [selectedGenre, setSelectedGenre] = useState(searchParams.get('genre') || 'action');

  const [getPresignedUrl] = useGetPresignedURLMutation();
  const [create, { isLoading: isCreatingMovies }] = useCreateMovieMutation();
  const [update, { isLoading: isUpdatingMovies }] = useUpdateMovieMutation();
  const [search, { isLoading: isSearchingMovies, isFetching: isFetchingMovies }] = useLazyLookupMoviesQuery();

  useEffect(() => {
    if (term.length > 2) {
      search(term)
        .unwrap()
        .then((res) => setSUggestions(res))
        .catch(() => setSUggestions([]));
    }
  }, [search, term]);

  function handleFile(file: File) {
    if (!file) return;

    setImageSrc(file);
  }

  const form = useForm<z.infer<typeof movieSchema>>({
    resolver: zodResolver(movieSchema),
    defaultValues: { title: searchParams.get('title') || '', year: searchParams.get('year') ? new Date(searchParams.get('year')!) : new Date() },
  });

  const debouncedSetTerm = debounce<any>(setTerm, 500);

  async function onSuggestionClick({ Title, Year, Rated, Genre, imdbRating, Poster }: MovieProps) {
    form.setValue('title', Title);
    form.setValue('year', new Date(Year));

    setSelectedRating(Rated);
    setSelectedGenre(Genre.toLowerCase().trim());
    setRating(Math.round(Number(imdbRating) || 0));

    setImageSrc(await urlToFile(Poster, `${uuidv4()}.jpg`, 'image/jpg'));
  }

  async function onSubmit(values: z.infer<typeof movieSchema>) {
    try {
      setIsLoading(true);

      const isUpdating = searchParams.get('movie');

      if (isUpdating) {
        const payload = {
          ...values,
          genre: selectedGenre,
          rated: selectedRating,
          imdbRating: rating.toString(),
          id: searchParams.get('movie'),
          poster: searchParams.get('posterKey'),
        };

        if (imageSrc) {
          const response = await getPresignedUrl(imageSrc?.name).unwrap();

          const formData = new FormData();
          Object.entries(response.fields).forEach(([key, value]) => formData.append(key, value as any));
          formData.append('file', imageSrc!);

          const res = await fetch(response.url, { method: 'POST', body: formData });
          if (!res.ok) throw new Error('Failed to upload image');

          payload.poster = response.key;
        }

        await update(payload).unwrap();

        toast({ title: 'Success', description: 'Movie updated successfully', variant: 'success' });
        router.replace('/app');

        return;
      }

      const payload = {
        ...values,
        poster: imageSrc,
        genre: selectedGenre,
        rated: selectedRating,
        imdbRating: rating.toString(),
      };

      // ! GET presigned url
      const response = await getPresignedUrl(imageSrc?.name).unwrap();

      const formData = new FormData();
      Object.entries(response.fields).forEach(([key, value]) => formData.append(key, value as any));
      formData.append('file', imageSrc!);

      // ! UPLOAD image to S3
      const res = await fetch(response.url, { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Failed to upload image');

      // ! CREATE movie
      await create({ ...payload, poster: response.key }).unwrap();

      toast({ title: 'Success', description: 'Movie created successfully', variant: 'success' });
      router.replace('/app');
    } catch (_) {
      toast({ title: 'Error', description: 'Something went wrong', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="p-10 md:p-20 grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(94vh)]">
      <div className="w-full">
        <h1 className="text-xl md:text-3xl">{searchParams.get('movie') ? 'Update movie' : 'Create new movie'}</h1>

        <div className="mt-8 space-y-8 w-full">
          {!imageSrc && (
            <div className="w-full">
              <FileUpload handleFile={handleFile} />
            </div>
          )}

          {imageSrc && (
            <div className="w-fit space-y-2">
              <div className="rounded-sm p-1 bg-secondary/50 w-fit">
                <img src={URL.createObjectURL(imageSrc)} alt="Uploaded Preview" className="rounded-sm" width={150} height={250} />
              </div>

              <Button variant="destructive" size="sm" className="w-full" onClick={() => setImageSrc(null)}>
                Remove
              </Button>
            </div>
          )}

          {searchParams.get('poster') && !imageSrc && (
            <div className="rounded-sm p-1 bg-secondary/50 w-fit">
              <img src={searchParams.get('poster')!} alt="Uploaded Preview" className="rounded-sm" width={150} height={250} />
            </div>
          )}

          <div className="w-full">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2 space-y-2">
                {(isSearchingMovies || isFetchingMovies) && (
                  <p className="text-xs text-muted-foreground flex gap-1">
                    <Loader className="w-4 h-4 animate-spin" />
                    <span>Fetching suggestions...</span>
                  </p>
                )}

                <FormField
                  name="title"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full"
                          placeholder="Movie title"
                          onChange={(e) => {
                            debouncedSetTerm(e.target.value);
                            form.setValue('title', e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="year"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="min-w-40 flex-1">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button variant="outline" className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}>
                              {field.value ? format(field.value, 'PPP') : <span>Published Date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>

                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-4">
                  <div className="w-full">
                    <Select onValueChange={(v) => setSelectedGenre(v)} value={selectedGenre}>
                      <SelectTrigger>
                        <SelectValue placeholder="Genre" />
                      </SelectTrigger>

                      <SelectContent>
                        {genres.map((genre) => (
                          <SelectItem key={genre.value} value={genre.value}>
                            {genre.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="w-full">
                    <Select onValueChange={(v) => setSelectedRating(v)} value={selectedRating}>
                      <SelectTrigger>
                        <SelectValue placeholder="Movie Rating" />
                      </SelectTrigger>

                      <SelectContent>
                        {ratings.map((rating) => (
                          <SelectItem key={rating.value} value={rating.value}>
                            {rating.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Rating setRating={setRating} rating={rating} />

                <div className="flex gap-4">
                  <Link href="/app" className="w-full">
                    <Button variant="outline" className="w-full" disabled={isCreatingMovies || isLoading}>
                      Cancel
                    </Button>
                  </Link>

                  <Button type="submit" className="w-full" disabled={isCreatingMovies || isLoading}>
                    Submit
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>

      <div className="p-4 w-full h-[calc(75vh)] overflow-hidden mt-16 border border-secondary rounded-lg bg-secondary/25">
        {!suggestions.length && (
          <div className="flex h-full w-full items-center justify-center">
            <div>
              <Loading />
              <p className="text-primary text-l text-center">Recommendations will appear here</p>
              <p className="text-muted-foreground text-xs text-center">Start by typing the title</p>
            </div>
          </div>
        )}

        {
          <ScrollArea className="h-full">
            <div className="flex gap-4 flex-wrap">
              {suggestions
                .filter((movie: MovieProps) => movie.Poster !== 'N/A')
                .map((movie: MovieProps, i) => (
                  <MovieCard key={i} {...movie} onSuggestionClick={onSuggestionClick} />
                ))}
            </div>
          </ScrollArea>
        }
      </div>
    </div>
  );
}
