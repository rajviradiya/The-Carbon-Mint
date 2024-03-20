import React from "react";
import "./Comp.css"

const ButtonComp = ({valuebutton,handleClick}) => {
  return (
    <>
      <button className="buttonEvent" onClick={()=>handleClick()}>{valuebutton}</button>
    </>
  );
};

export default ButtonComp;
