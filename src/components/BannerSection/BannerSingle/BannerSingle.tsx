import { Movie } from "@/type/MovieType";
import { Rating } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface BannerSingleProps {
  movie: Movie;
  currentItem: number;
  itemIndex: number;
}

const BannerSingle: React.FC<BannerSingleProps> = ({
  movie,
  currentItem,
  itemIndex,
}) => {
  const backDropImg = `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`;
  const imgUrl = `https://image.tmdb.org/t/p/w1280${movie.poster_path}`;

  return (
    <div
      id={`item${itemIndex}`}
      className={`carousel-item relative w-full ${
        currentItem === itemIndex ? "block" : "hidden"
      }`}
    >
      <Image
        width={1600}
        height={800}
        className="object-top object-cover lg:max-h-[65vh] max-h-screen w-full"
        src={backDropImg}
        alt={movie.title}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
      <div className="flex lg:gap-16 sm:gap-8 gap-4 absolute bottom-10 left-10">
        <div>
          <Image
            width={450}
            height={400}
            className="w-24 lg:w-64"
            alt={movie.title}
            src={imgUrl}
          />
        </div>
        <div className="self-end">
          <h2 className="lg:text-5xl md:text-4xl sm:text-3xl text-2xl text-white">
            {movie.title}
          </h2>
          <p className="lg:mt-4 text-stone-400 text-wrap min-w-40 hidden lg:block">
            {movie.overview}
          </p>
          <p className="mt-4 text-stone-400">Votes: {movie.vote_count}</p>
          <div className="sm:flex gap-10">
            <div className="tooltip tooltip-right" data-tip={(movie.vote_average / 2).toFixed(1) + `/ 5`}>
              <Rating 
              name="read-only"
              readOnly
              value={movie.vote_average / 2}
              precision={0.5}
              max={5}
              />
            </div>
            <div>
              <Link 
              href={`/movies/${movie.id}`}
              className="bg-[#334155] hover:bg-[#242e3d] text-gray-300 border-none rounded-2xl px-4 py-2 mx-2"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSingle;
