import { Rating, Typography } from "@mui/material";
import Image from "next/image";

interface tvShowHeaderProps {
  movie: any;
  genreName: string;
  featuredCrew: any[];
  handleOpenModal: (image: string) => void;
}

const MediaDetails = ({
  movie,
  genreName,
  featuredCrew,
  handleOpenModal,
}: tvShowHeaderProps) => {
  const imageUrl = `https://image.tmdb.org/t/p/w1280${movie.poster_path}`;
  const backdrop_path = `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`;

  return (
    <div className="relative">
      <Image
        width={1200}
        height={800}
        className="object-top lg:max-h-[75vh] h-[75vh] w-full object-cover"
        src={backdrop_path}
        alt={movie.title}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
      <div className="absolute bottom-10 left-10 sm:flex lg:gap-16 sm:gap-8 gap-4">
        <div>
          <Image
            width={450}
            height={400}
            className="w-24 lg:w-64"
            src={imageUrl}
            alt={movie.title}
          />
        </div>
        <div className="self-end">
            <h2 className="lg:text-5xl md:text-4xl sm:text-3xl text-2xl text-white">
                {movie.name}
            </h2>
            <p className="lg:mt-4 text-stone-400 text-wrap min-w-40 hidden lg:block">
                {movie.overview}
            </p>
            <div className="md:flex md:gap-20">
                <div>
                    <p className="mt-4 text-stone-400">
                        <Typography component='legend'>
                            Total votes: {movie.vote_count}
                        </Typography>
                        <div className="tooltip tooltip-right" data-tip={(movie.vote_average /2).toFixed(1) + `/ 5`}>
                                <Rating
                                size="small"
                                name="read-only"
                                readOnly
                                value={movie.vote_average /2}
                                precision={0.5}
                                max={5}
                                />

                        </div>

                    </p>
                    <p className="mt-4 text-stone-400">
                        Genres: {" "}
                        <div>
                            <div className="badge badge-outline rounded-lg">
                                {genreName}
                            </div>
                        </div>{" "}
                    </p>
                </div>
                <div>
                    <p className="mt-4 text-stone-400">
                        <h2 className="sm:text-xl text-md text-white font-semibold mb-4">
                            Featured Crew
                        </h2>
                    </p>
                    <div className="md:flex gap-6 justify-start">
                        {featuredCrew && featuredCrew.length > 0? (
                            featuredCrew.slice(0,4).map((member: any, index: number) => (
                                <div key={index}>
                                    <div>
                                        <p className="text-white text-center text-[14px]">
                                            {member.name}
                                        </p>
                                        <p className="text-gray-400 text-center text-[12px]">
                                            {member.job}
                                        </p>
                                    </div>
                                </div>
                            )
                            )
                        ):(
                            <p>No feature crew information available</p>
                        )
                    
                    }

                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MediaDetails;
