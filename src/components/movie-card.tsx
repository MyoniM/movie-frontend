import { format } from 'date-fns';
import React from 'react';

export interface MovieProps {
  Year: string;
  Title: string;
  Rated: string;
  Genre: string;
  Poster: string;
  imdbRating: string;
  onSuggestionClick?: ({ Title, Year, Rated, Genre, imdbRating, Poster }: MovieProps) => void;
}
 
function takeFirstGenre(Genre: string) {
  return (Genre || 'N/A').split(',')[0].toUpperCase();
}

export default function MovieCard({ Title, Year, Rated, Genre, imdbRating, Poster, onSuggestionClick }: MovieProps) {
  return (
    <div
      className="text-left w-56 h-fit cursor-pointer border border-primary/0 hover:border-primary hover:shadow-md transition ease-in-out delay-70 bg-secondary/50 p-1 rounded-sm"
      onClick={() => onSuggestionClick!({ Title, Year, Rated, Genre: takeFirstGenre(Genre), imdbRating, Poster })}
    >
      <img src={Poster} alt={Title} className="rounded-sm h-72 w-56 object-fill" />

      <h1 className="text-primary text-sm mt-2 overflow-hidden text-nowrap text-ellipsis">{Title}</h1>

      <div className="flex justify-between gap-2 text-muted-foreground text-sm">
        <p>{format(Year, 'MMM dd, yyyy ')}</p>
        <div className="flex gap-1">
          <p>{Rated}</p>⭐<p>{imdbRating}</p>
        </div>
      </div>

      <span className="rounded-sm bg-primary/50 inline-block px-2 mr-1 mb-1 w-fit self-start text-white text-xs">{takeFirstGenre(Genre)}</span>
    </div>
  );
}
