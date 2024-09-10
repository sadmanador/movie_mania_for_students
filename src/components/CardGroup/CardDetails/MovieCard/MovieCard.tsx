import { Movie } from "@/type/MovieType";
import { Rating, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const MovieCard = ({ media }: { media: Movie }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w1280${media.poster_path}`;

  return (
    <Link
      href={`/movies/${media.id}}`}
      className="card bg-base-300 w-auto shadow-[0_4px_8px_0_rgba(0,0,0,0.3)] hover:shadow-[3px_4px_8px_2px_rgba(0,0,0,0.5)] hover:transition-all duration-300 cursor-pointer sm:hover:scale-[1.04] transition-transform ease-in-out"
    >
      <figure>
        <Image width={300} height={300} src={imageUrl} alt={media.title} />
      </figure>
      <div className="card-body py-2 tooltip" data-tip={media.title}>
        <h2 className="card-title hover:text-yellow-500 text-lg">
          {media.title.length >= 20
            ? media.title.slice(0, 16) + "..."
            : media.title}
        </h2>

        <div className="card-actions justify-start">
          <div>
            <div>
              <Typography component="legend">
                Total votes: {media.vote_count}
              </Typography>
              <div
                className="tooltip tooltip-right"
                data-tip={(media.vote_average / 2).toFixed(1) + "/5"}
              >
                <Rating
                  name="read-only"
                  readOnly
                  value={media.vote_average / 2}
                  precision={0.5}
                  max={5}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
