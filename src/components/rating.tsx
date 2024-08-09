import React, { Dispatch, SetStateAction } from 'react';

import { Star } from 'lucide-react';

export default function Rating({ rating, setRating }: { rating: number; setRating: Dispatch<SetStateAction<number>> }) {
  return (
    <div className="space-y-2">
      <p>Rating</p>

      <div className="flex justify-between items-center">
        {Array(10)
          .fill(0)
          .map((e, i) => {
            return <StarElement key={i} value={i} setRating={setRating} rating={rating} />;
          })}
      </div>
    </div>
  );
}

function StarElement({ value, rating, setRating }: { value: number; rating: number; setRating: Dispatch<SetStateAction<number>> }) {
  return (
    <p className="cursor-pointer" onClick={() => setRating(value + 1)}>
      {value < rating ? '⭐' : <Star size={18} />}
    </p>
  );
}
