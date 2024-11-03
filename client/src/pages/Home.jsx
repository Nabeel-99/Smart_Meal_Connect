import React, { useEffect } from "react";
import Hero from "../sections/Hero";
import Features from "../sections/Features";
import About from "../sections/About";
import { useNavigate } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col w-full overflow-hidden pt-10 gap-20 ">
      <Hero />
      <Features />
      <About />
    </div>
  );
};

export default Home;
