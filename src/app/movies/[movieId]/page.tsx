"use client";
import Casting from "@/components/Casting/Casting";
import MediaDetails from "@/components/MediaDetails/MediaDetails";
import SceneGallery from "@/components/SceneGallery/SceneGallery";
import SceneModal from "@/components/SceneModal/SceneModal";
import SimilarMovieGroup from "@/components/SimilarMovieGroup/SimilarMovieGroup";
import Trailers from "@/components/Trailers/Trailers";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const DetailedMoviePage = () => {
  const [movie, setMovie] = useState<any>(null);
  const [youtubeData, setYoutubeData] = useState<any>(null);
  const [credits, setCredits] = useState<any>(null); 
  const [sceneImages, setSceneImages] = useState<any>(null); 
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const pathname = usePathname();
  const lastPartOfPath = pathname?.split("/movies/")[1];
  const numericMovieId = Number(lastPartOfPath);



  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const res = await fetch(
          `${"https://api.themoviedb.org/3"}/movie/${numericMovieId}?api_key=${"c7cf1258a5aa723e8a98f08f639e86b6"}`
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setMovie(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchMovieData();
  }, [numericMovieId]);

  useEffect(() => {
    const fetchYoutubeData = async () => {
      try {
        const res = await fetch(
          `${"https://api.themoviedb.org/3"}/movie/${numericMovieId}/videos?api_key=${"c7cf1258a5aa723e8a98f08f639e86b6"}`
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setYoutubeData(data.results.slice(0, 6));
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchYoutubeData();
  }, [numericMovieId]);

  useEffect(() => {
    const fetchMovieCredits = async () => {
      try {
        const res = await fetch(
          `${"https://api.themoviedb.org/3"}/movie/${numericMovieId}/credits?api_key=${"c7cf1258a5aa723e8a98f08f639e86b6"}`
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setCredits(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchMovieCredits();
  }, [numericMovieId]);

  useEffect(() => {
    const fetchMovieImages = async () => {
      try {
        const res = await fetch(
          `${"https://api.themoviedb.org/3"}/movie/${numericMovieId}/images?api_key=${"c7cf1258a5aa723e8a98f08f639e86b6"}`
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setSceneImages(data.backdrops.slice(0, 6));
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchMovieImages();
  }, [numericMovieId]);

  const genreNames = movie?.genres
    .map((genre: { name: string }) => genre.name)
    .join(", ");

  // Filter out crew members who are not involved in Acting
  const featuredCrew = credits?.crew.filter((member: any) =>
    ["Director", "Producer", "Screenplay", "Writer"].includes(member.job)
  );

  const handleOpenModal = (image: string) => {
    setSelectedImage(image);
    const dialog = document.getElementById("scene_modal") as HTMLDialogElement;
    if (dialog) {
      dialog.showModal();
    }
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    const dialog = document.getElementById("scene_modal") as HTMLDialogElement;
    if (dialog) {
      dialog.close();
    }
  };

  return (
    <div className="">
      {movie ? (
        <>
          <MediaDetails
            movie={movie}
            genreName={genreNames}
            featuredCrew={credits?.crew}
            handleOpenModal={handleOpenModal}
          />
          <Trailers youtubeData={youtubeData} />
          <Casting cast={credits?.cast || []} />
          <SceneGallery
            mediaType={"movie"}
            sceneImages={sceneImages}
            handleImageClick={handleOpenModal}
          />
          <SceneModal
            selectedImage={selectedImage}
            onClose={handleCloseModal}
          />
          <SimilarMovieGroup
            mediaType={"movie"}
            movieId={numericMovieId.toString()}
          />
        </>
      ) : (
        <p>Loading...single</p>
      )}
    </div>
  );
};

export default DetailedMoviePage;
