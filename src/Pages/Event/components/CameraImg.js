import React from "react";
import { CgClose } from "react-icons/cg";
import { useFierbase } from "../../../context/fierbasecontext";

const CameraImg = ({ image, index }) => {
  const fierbase = useFierbase()
  //close Image
  const handleclose = () => {
    fierbase.setImageUrl(prevUrl => prevUrl.filter((k, i) => i !== index))
  }

  return (
    <div class="image-container mb-2" key={index}>
      <img src={URL.createObjectURL(image)} alt="UserImg" />
      <button class="buttoncloseee" onClick={() => handleclose()}><CgClose /></button>
    </div>
  );
};

export default CameraImg;
