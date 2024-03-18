import React from "react";
import { CgClose } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useFierbase } from "../../../context/fierbasecontext";

const CloseNav = () => {
  const fierbase = useFierbase()

  return (
    <div className=" container closenav">
      <div className="closeicon">
        <Link to="/" onClick={()=>fierbase.setSearchcont("")}>
          <CgClose />
        </Link>
      </div>
      <div className="navcont">Select country</div>
    </div>
  );
};

export default CloseNav;
