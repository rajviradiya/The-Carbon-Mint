import React from 'react'
import { Link } from 'react-router-dom'
import { IoIosArrowRoundBack } from "react-icons/io";

const ClosenavCrop = ({datamain,data}) => {

  return (
    <div className="closenav">
    <div className="navicon">
      <Link to="/home">
        <IoIosArrowRoundBack />
      </Link>
    </div>
    <div className="navcont">
      <span>{data?.feild}: {data?.name}</span>
      <p>{datamain?.city},{datamain?.district}</p>
    </div>
  </div>
  )
}

export default ClosenavCrop