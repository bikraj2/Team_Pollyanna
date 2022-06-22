import React from "react";
import "./button.css";

const button = () => {
  return (
    <>
      <button
        // onClick={(e) => {
        //   e.preventDefault(e);
        //   axios
        //     .post("https://reqres.in/api/articles", boundData)
        //     .then((res) => {
        //       console.log(res);
        //     })
        //     .catch((e) => {
        //       console.log(e);
        //     });
        //   navigate("/analysis");
        // }}
        className="buttonClass"
      >
        Analyse
      </button>
    </>
  );
};

export default button;
