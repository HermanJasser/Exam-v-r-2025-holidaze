import React from "react";

const Footer = () => {
  return (
    <footer className="flex items-center bg-sekBG py-8 h-[200px]">
      <div className="container mx-auto text-center ">
        <img
          src="/assets/Holidaze.svg"
          alt="Holidaze logo"
          className="mx-auto h-[40px] md:h-[60px] hover:scale-[1.01] transition-transform duration-200"
        />
      </div>
    </footer>
  );
};

export default Footer;
