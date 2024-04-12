import React from 'react'
import { Link } from 'react-router-dom'
import { IoIosArrowRoundBack } from "react-icons/io";

const ClosenavCrop = ({ landparcel2,landparcel,crop }) => {

  return (
    <div className="closenav">
      <div className="navicon">
        <Link to="/home">
          <IoIosArrowRoundBack />
        </Link>
      </div>
      <div className="navcont">
        <span>{crop?.feild}: {crop?.name}</span>
        <p>{landparcel2?.city},{landparcel2?.district}</p>
      </div>
    </div>
  )
}

export default ClosenavCrop