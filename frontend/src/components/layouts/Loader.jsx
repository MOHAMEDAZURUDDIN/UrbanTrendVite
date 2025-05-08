import React from "react";

export default function Loader() {
  return (
    <div className="bg-black flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full border-spacing-10 border-t-8 border-yellow-500 h-24 w-72"></div>
    </div>
  );
}
