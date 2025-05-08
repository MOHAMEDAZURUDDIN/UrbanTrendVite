import React from "react";
import Clips from "../Utils/Clips";
import clip from "../../assets/video/clip.mp4"
import vcover1 from '../../assets/video/vcover1.png'
import vcover2 from '../../assets/video/vcover2.png'
import vcover3 from '../../assets/video/vcover3.png'
import heroimg from '../../assets/hero.png'
import { useNavigate } from "react-router-dom";

const Hero = ({}) => {
  const navigate = useNavigate()
  const videos = [
    {imgsrc:vcover1,clip:clip},
    {imgsrc:vcover2,clip:clip},
    {imgsrc:vcover3,clip:clip},
  ]
  const handleExplore = ()=> {
  navigate('/')
  }
  return (
    <>
      <div className="relative h-auto w-auto flex flex-col px-4">
        <div className="bg-gradient-to-b from-green-900 via-green-700 to-green-900 clip-path h-[95vh] lg:h-[95vh] md:h-[75vh] sm:h-[65vh] w-auto absolute top-0 left-0 right-0 opacity-100 z-10"></div>
        <div className="relative opacity-100 z-20 grid items-center justify-items-center shoes-container">
          <div className="grid items-center justify-items-center mt-28 md:mt-24">
            <h1 className="text-6xl lg:text-5xl md:text-4xl sm:text-3xl xsm:text-2xl font-extrabold filter drop-shadow-sm text-coral-red">
            Urban <span className="text-yellow-500">Trends:</span> 
            </h1>
            <h1 className="text-6xl lg:text-5xl md:text-4xl sm:text-3xl xsm:text-2xl font-extrabold filter drop-shadow-sm text-slate-200">
            Style Spark
            </h1>
            <button
            onClick={handleExplore}
              type="button"
              className="button-theme bg-slate-200 shadow-slate-200 rounded-xl font-semibold mt-4"
            >
              Explore Product
            </button>
            <div className="grid items-center gap-5 md:gap-3 absolute top-[33vh] lg:top-[39vh] sm:top-60 left-[11%] xl:left-0 w-auto h-auto">
              {videos?.map((val, i) => (
                <Clips key={i} imgsrc={val.imgsrc} clip={val.clip} />
              ))}
            </div>
    
          </div>
          <div className="-mt-10">
            <img
              src={heroimg}
              alt="hero-img/img"
              className="w-full  h-[75vh] lg:h-[65vh] md:h-[41vh] sm:h-[31vh] xsm:h-[24vh] transitions-theme rotate-[5deg] hover:rotate-[30deg] cursor-pointer object-fill  "
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
