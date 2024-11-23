import React from "react";
import About from "../sections/About";

const AboutPage = ({ theme }) => {
  return (
    <div className="pt-20 xl:pt-44">
      <About theme={theme} />
    </div>
  );
};

export default AboutPage;
