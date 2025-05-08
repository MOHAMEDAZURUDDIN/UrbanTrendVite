import React from "react";
import { Link } from "react-router-dom";
import highlightsImg from "../../assets/flex3.png";
const FlexContent = () => {
  return (
    <>
      <div
        className={`flex items-center justify-between lg:flex-col lg:justify-center shoes-container flex-row px-24 mb-8`}
      >
        <div className="max-w-lg lg:max-w-none w-full md:text-center grid items-center lg:justify-items-center">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl sm:text-3xl font-bold text-gradient">
              HIGHLIGHTS
            </h1>
            <h1 className="text-5xl lg:text-4xl md:text-3xl sm:text-2xl font-bold text-slate-900 filter drop-shadow-lg">
              RTFKT <span className="text-coral-red">x</span> Nike Dunk
            </h1>
            
              <p className="xl:text-sm my-4 text-slate-900">
                The RTFKT x Nike Dunk Genesis merges the worlds of digital art
                and physical footwear, heralding a new era in sneaker culture.
              </p>
            
          </div>

          <a
            href="https://www.ebay.ca/sch/i.html?_nkw=nike+dunk+pharrell&Brand=&_dcat=15709"
            className="flex items-center"
            target={`_blank`}
            role="button"
          >
            <button
              type="button"
              className="button-theme bg-slate-900 shadow-slate-900 text-slate-100 py-1.5"
            >
              Explore More
            </button>
          </a>
        </div>
        <div className="flex items-center justify-center max-w-xl relative lg:max-w-none w-full">
          <img
            src={highlightsImg}
            alt={`img/highlights`}
            className={`w-auto object-fill transitions-theme h-1/2 lg:h-96 md:h-60 sm:h-44 xsm:h-40 -rotate-[30deg] hover:rotate-[15deg] `}
          />
        </div>
      </div>
    </>
  );
};

export default FlexContent;
