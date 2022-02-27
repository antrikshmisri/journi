import React from "react";

import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <Logo
        onAnimationEnd={() => {
          navigate("/login");
        }}
        duration={6}
      />
    </div>
  );
};

export default Landing;
