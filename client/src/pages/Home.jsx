import React, { useEffect } from "react";
import Hero from "../sections/Hero";
import Features from "../sections/Features";
import About from "../sections/About";
import { useNavigate } from "react-router-dom";
import CTACard from "../components/ui/CTACard";

const Home = ({ theme }) => {
  return (
    <div className="flex flex-col w-full overflow-hidden  gap-20 ">
      <Hero />
      <Features theme={theme} />
      {/* <About theme={theme} /> */}
      <CTACard />
    </div>
  );
};

export default Home;
