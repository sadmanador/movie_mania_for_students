export type MasterDataContext = {
  movies: any[];
  searchResult: any[];
  sliderData: any[];
  similarMovies: any[];
  loading: boolean;
  error: Error | null;
  page: number;
  detailsType: "movie" | "tv";
  movieOrTV: "movie" | "tv";
  singleMovie: {};
  movieId: string;
  setPage: (page: number | ((prev: number) => number)) => void;
  setQuery: (query: string | ((prev: string) => string)) => void;
  setDetailsType: (
    detailsType: "movie" | "tv" | ((prev: "movie" | "tv") => "movie" | "tv")
  ) => void;
  setMovieOrTV: (movieOrTv: "movie" | "tv" | ((prev: "movie" | "tv") => "movie" | "tv")) => void;
  setTrendingOptions: (
    trendingOptions: string | ((prev: string) => string)
  ) => void;
  setSingleMovie: (singleMovie: {} | ((prev: {}) => {})) => void;
  setMovieId: (movieId: string | ((prev: string) => string)) => void;
}
