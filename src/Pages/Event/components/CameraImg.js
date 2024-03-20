import React from "react";
import { CgClose } from "react-icons/cg";
import { useFierbase } from "../../../context/fierbasecontext";

const CameraImg = ({ image, index }) => {
  
  const fierbase = useFierbase()
  console.log(fierbase.imageurl, "is index")


  const handleclose = () => {
      fierbase.setImageUrl(prevUrl => prevUrl.filter((k,i)=> i !== index))
  }

  return (
    <section class="image-container mb-2">
      <img src={image} />
      <button class="buttoncloseee" onClick={() => handleclose()}><CgClose /></button>
    </section>
  );
};

export default CameraImg;
