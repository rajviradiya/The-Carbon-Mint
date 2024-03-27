import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useFierbase } from "../../../context/fierbasecontext";

const CloseNav = () => {
  const fierbase = useFierbase()

  return (
    <div className=" container closenav">
      <div className="closeicon">
        <Link to="/" onClick={()=>fierbase.setSearchcont("")}>
          <IoCloseOutline style={{color:"#363537"}} />
        </Link>
      </div>
      <div className="navcont">Select country</div>
    </div>
  );
};

export default CloseNav;
