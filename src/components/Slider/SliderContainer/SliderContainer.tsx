import { MasterContext } from "@/context/MasterContext";
import React, { useContext } from "react";
import SliderSingle from "../SliderSingle/SliderSingle";


const SliderContainer = () => {
  const { movies } = useContext(MasterContext);

  return (
    <div className="my-10">
      <h2 className="text-2xl text-yellow-500 font-bold ml-16 mb-8 flex justify-between">In Cinemas <span className="text-[16px] md:mr-16 mr-4">Slide left to see more &gt;&gt;&gt;</span></h2>
      <div className="carousel carousel-end rounded-box">
        {movies.map((movie, index) =>  <SliderSingle key={index} movie={movie} />)}
      </div>
    </div>
  );
};

export default SliderContainer;
