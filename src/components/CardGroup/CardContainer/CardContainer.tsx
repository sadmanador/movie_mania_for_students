import { MasterContext } from "@/context/MasterContext";
import { useContext, useEffect } from "react";
import Pagination from "@/components/CardGroup/Pagination/Pagination";
import MovieCard from "@/components/CardGroup/CardDetails/MovieCard/MovieCard";
import TVshowCard from "@/components/CardGroup/CardDetails/TVshowCard/TVshowCard";



interface CardGroupProps {
  streamingType: "movie" | "tv";
  activeTab: string;
}

const CardContainer: React.FC<CardGroupProps> = ({ streamingType, activeTab }) => {
  const { movies, setMovieOrTV, setTrendingOptions } =
    useContext(MasterContext);

  useEffect(() => {

    setMovieOrTV(streamingType);
  }, [streamingType, setMovieOrTV]);

  setTrendingOptions(activeTab);

  return (
    <>
      <Pagination />
      <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 lg:mx-14 mx-4">
        {movies
        .filter((movie) => movie.poster_path)
        .map((movie, index) =>
          streamingType == "movie" ? (
            <MovieCard key={index} media={movie} />
          ) : (
            <TVshowCard key={index} media={movie} />
          )
        )}
      </div>
      <Pagination />
    </>
  );
};

export default CardContainer;
