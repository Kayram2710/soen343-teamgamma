import React from "react";
import "./AwayMode.css";

const AwayMode = () => {
  const handleAwayModeToggle = async () => {
    const awayModeToggler = document.getElementById("awayModeToggler");
    const sliderCtn = document.querySelector(".sliderCtn");
    if (awayModeToggler.classList.contains("sliderBallActive")) {
      awayModeToggler.classList.remove("sliderBallActive");
      sliderCtn.classList.remove("sliderCtnActive");
    } else {
      awayModeToggler.classList.add("sliderBallActive");
      sliderCtn.classList.add("sliderCtnActive");
    }

    await fetch(
      `http://localhost:8080/api/v1/shp/toggleAwayMode/${awayModeToggler.classList.contains(
        "sliderBallActive"
      )}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
      if (response.ok) {
        console.log("Away mode toggled");
      } else {
        console.log("Away mode toggle failed");
      }
    });
  };

  return (
    <>
      <div className="sliderCtn">
        <div
          id="awayModeToggler"
          onClick={handleAwayModeToggle}
          className="sliderBall"
        ></div>
      </div>
    </>
  );
};

export default AwayMode;
