
import { MasterDataContext } from "@/type/MasterDataType";
import React, { createContext, ReactNode, useEffect, useState, useRef } from "react";

const defaultContextValue: MasterDataContext = {
  movies: [],
  searchResult: [],
  sliderData: [],
  similarMovies: [],
  loading: true,
  error: null,
  page: 1,
  detailsType: "movie",
  movieOrTV: "movie",
  singleMovie: {},
  movieId: "",
  setPage: () => {},
  setQuery: () => {},
  setSingleMovie: () => {},
  setMovieOrTV: () => {},
  setTrendingOptions: () => {},
  setDetailsType: () => {},
  setMovieId: () => {},
};

export const MasterContext = createContext<MasterDataContext>(defaultContextValue);

interface BannerContextProps {
  children: ReactNode;
}

const API_KEY = "c7cf1258a5aa723e8a98f08f639e86b6";
const BASE_URL = "https://api.themoviedb.org/3";

const MainContext: React.FC<BannerContextProps> = ({ children }) => {
  const [singleMovie, setSingleMovie] = useState<{}>({});
  const [movies, setMovies] = useState<any[]>([]);
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [sliderData, setSliderData] = useState<any[]>([]);
  const [similarMovies, setSimilarMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [movieOrTV, setMovieOrTV] = useState<"movie" | "tv">("movie");
  const [trendingOptions, setTrendingOptions] = useState<string>("top_rated");
  const [detailsType, setDetailsType] = useState<"movie" | "tv">("movie");
  const [movieId, setMovieId] = useState<string>("");

  const prevTrendingOptionsRef = useRef<string>(trendingOptions);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${BASE_URL}/${movieOrTV}/${trendingOptions}?api_key=${API_KEY}&page=${page}`
        );
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Response Error:", errorText);
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
  
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        setError(error as Error);
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    // Check if trendingOptions has changed, if so, reset page to 1
    if (prevTrendingOptionsRef.current !== trendingOptions) {
      setPage(1);
    }

    // Update the previous trendingOptions ref
    prevTrendingOptionsRef.current = trendingOptions;

    fetchData();
  }, [page, movieOrTV, trendingOptions]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/movie/now_playing?api_key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSliderData(data.results);
      } catch (error) {
        setError(error as Error);
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSearchResult(data.results);
      } catch (error) {
        setError(error as Error);
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      if (movieId) {
        try {
          const response = await fetch(
            `${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setSimilarMovies(data.results);
        } catch (error) {
          setError(error as Error);
          console.error("Fetch error:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchSimilarMovies();
  }, [movieId]);

  const contextValue: MasterDataContext = {
    movies,
    sliderData,
    searchResult,
    similarMovies,
    loading,
    error,
    setPage,
    page,
    setQuery,
    singleMovie,
    setSingleMovie,
    setMovieOrTV,
    setTrendingOptions,
    detailsType,
    setDetailsType,
    movieId,
    setMovieId,
    movieOrTV,
  };

  return (
    <MasterContext.Provider value={contextValue}>
      {children}
    </MasterContext.Provider>
  );
};

export default MainContext;
